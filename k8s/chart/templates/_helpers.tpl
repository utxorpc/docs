{{- define "utxorpc-docs.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "utxorpc-docs.fullname" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{- define "utxorpc-docs.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/* Name of one component's objects: "<fullname>-<component>". */}}
{{- define "utxorpc-docs.componentName" -}}
{{- printf "%s-%s" (include "utxorpc-docs.fullname" .root) .component | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "utxorpc-docs.selectorLabels" -}}
app.kubernetes.io/name: {{ include "utxorpc-docs.name" .root }}
app.kubernetes.io/instance: {{ .root.Release.Name }}
app.kubernetes.io/component: {{ .component }}
{{- end -}}

{{- define "utxorpc-docs.labels" -}}
helm.sh/chart: {{ include "utxorpc-docs.chart" .root }}
{{ include "utxorpc-docs.selectorLabels" . }}
app.kubernetes.io/version: {{ .values.image.tag | trunc 63 | quote }}
app.kubernetes.io/managed-by: {{ .root.Release.Service }}
{{- end -}}

{{- define "utxorpc-docs.image" -}}
{{- $img := .values.image -}}
{{- $repository := required (printf "%s.image.repository is required" .component) $img.repository -}}
{{- $tag := required (printf "%s.image.tag is required" .component) $img.tag -}}
{{- if $img.digest -}}
{{- printf "%s:%s@%s" $repository $tag $img.digest -}}
{{- else -}}
{{- printf "%s:%s" $repository $tag -}}
{{- end -}}
{{- end -}}

{{/* A component's nodeSelector, falling back to the shared one. */}}
{{- define "utxorpc-docs.placement" -}}
{{- with (default .root.Values.nodeSelector .values.nodeSelector) }}
nodeSelector:
  {{- toYaml . | nindent 2 }}
{{- end }}
{{- with (default .root.Values.tolerations .values.tolerations) }}
tolerations:
  {{- toYaml . | nindent 2 }}
{{- end }}
{{- end -}}
