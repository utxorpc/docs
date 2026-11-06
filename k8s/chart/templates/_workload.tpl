{{/*
One component's Deployment, Service and optional Ingress. The caller passes
root (the chart context), component (its name), values (its values block),
env (the environment the component needs, which wins over values.env) and
probe (a probe handler).
*/}}
{{- define "utxorpc-docs.workload" -}}
{{- $name := include "utxorpc-docs.componentName" . -}}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ $name }}
  namespace: {{ .root.Release.Namespace }}
  labels:
    {{- include "utxorpc-docs.labels" . | nindent 4 }}
spec:
  replicas: {{ .values.replicaCount }}
  selector:
    matchLabels:
      {{- include "utxorpc-docs.selectorLabels" . | nindent 6 }}
  template:
    metadata:
      labels:
        {{- include "utxorpc-docs.selectorLabels" . | nindent 8 }}
    spec:
      {{- with include "utxorpc-docs.placement" . | trim }}
      {{- . | nindent 6 }}
      {{- end }}
      containers:
        - name: {{ .component }}
          image: {{ include "utxorpc-docs.image" . }}
          imagePullPolicy: {{ .values.image.pullPolicy }}
          ports:
            - name: http
              containerPort: {{ .values.port | int }}
          {{- with merge (dict) .env .values.env }}
          env:
            {{- range $key, $value := . }}
            - name: {{ $key }}
              value: {{ $value | toString | quote }}
            {{- end }}
          {{- end }}
          {{- with .values.existingSecret }}
          envFrom:
            - secretRef:
                name: {{ . }}
          {{- end }}
          readinessProbe:
            {{- toYaml .probe | nindent 12 }}
            periodSeconds: 10
          livenessProbe:
            {{- toYaml .probe | nindent 12 }}
            periodSeconds: 20
            failureThreshold: 3
          {{- with .values.resources }}
          resources:
            {{- toYaml . | nindent 12 }}
          {{- end }}
          {{- with .values.securityContext }}
          securityContext:
            {{- toYaml . | nindent 12 }}
          {{- end }}
---
apiVersion: v1
kind: Service
metadata:
  name: {{ $name }}
  namespace: {{ .root.Release.Namespace }}
  labels:
    {{- include "utxorpc-docs.labels" . | nindent 4 }}
  {{- with .values.service.annotations }}
  annotations:
    {{- toYaml . | nindent 4 }}
  {{- end }}
spec:
  type: {{ .values.service.type }}
  selector:
    {{- include "utxorpc-docs.selectorLabels" . | nindent 4 }}
  ports:
    - name: http
      port: {{ .values.service.port }}
      targetPort: http
{{- with .values.ingress }}
{{- if .enabled }}
{{- $host := required (printf "%s.ingress.host is required" $.component) .host }}
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: {{ $name }}
  namespace: {{ $.root.Release.Namespace }}
  labels:
    {{- include "utxorpc-docs.labels" $ | nindent 4 }}
  annotations:
    cert-manager.io/cluster-issuer: {{ required (printf "%s.ingress.clusterIssuer is required" $.component) .clusterIssuer }}
    {{- with .annotations }}
    {{- toYaml . | nindent 4 }}
    {{- end }}
spec:
  ingressClassName: {{ required (printf "%s.ingress.className is required" $.component) .className }}
  rules:
    - host: {{ $host }}
      http:
        paths:
          - path: {{ .path }}
            pathType: {{ .pathType }}
            backend:
              service:
                name: {{ $name }}
                port:
                  name: http
  tls:
    - hosts:
        - {{ $host }}
      secretName: {{ required (printf "%s.ingress.tlsSecretName is required" $.component) .tlsSecretName }}
{{- end }}
{{- end }}
{{- end -}}
