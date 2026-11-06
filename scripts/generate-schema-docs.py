#!/usr/bin/env python3
"""Writes the schema pages from protoc-gen-doc output.

Usage: generate-schema-docs.py <docs.md> <version> <spec tag>

Produce docs.md from a checkout of the spec's `proto` directory at that tag:
  buf generate . --template <template> --path utxorpc/<version>
where the template runs buf.build/community/pseudomuto-doc:v1.5.1 with
`markdown,docs.md`.
"""

import re
import sys
from pathlib import Path

PAGES = Path(__file__).resolve().parent.parent / "pages"

# module -> (page file, route, title)
TARGETS = {
    "bitcoin": ("bitcoin.mdx", "/bitcoin", "Bitcoin Module"),
    "cardano": ("cardano.mdx", "/cardano", "Cardano Module"),
    "handshake": ("handshake.mdx", "/handshake", "Handshake Module"),
    "query": ("query/spec.mdx", "/query/spec", "Query Module Spec"),
    "submit": ("submit/spec.mdx", "/submit/spec", "Submit Module Spec"),
    "sync": ("sync/spec.mdx", "/sync/spec", "Sync Module Spec"),
    "watch": ("watch/spec.mdx", "/watch/spec", "Watch Module Spec"),
}


def main(source, version, tag):
    text = Path(source).read_text()
    parts = re.split(rf"^## utxorpc/{version}/(\w+)/\w+\.proto$", text, flags=re.M)

    sections = {}
    for module, body in zip(parts[1::2], parts[2::2]):
        sections[module] = body.split("## Scalar Value Types")[0]

    missing = set(sections) ^ set(TARGETS)
    if missing:
        sys.exit(f"modules without a target, or targets without a module: {missing}")

    anchor_page = {}
    for module, body in sections.items():
        for anchor in re.findall(r'<a name="([^"]+)"', body):
            anchor_page[anchor] = module

    def link(module, match):
        label, anchor = match.group(1), match.group(2)
        target = anchor_page.get(anchor)
        if target is None:
            return label
        if target == module:
            return match.group(0)
        return f"[{label}]({TARGETS[target][1]}#{anchor})"

    for module, body in sections.items():
        page, _, title = TARGETS[module]
        body = re.sub(r'^<a name="\w*\.proto"></a>\n', "", body, flags=re.M)
        body = re.sub(r'^<p align="right">.*</p>\n', "", body, flags=re.M)
        body = re.sub(
            r"\[([^\]]+)\]\(#([^)]+)\)", lambda m: link(module, m), body
        )
        body = re.sub(r"\n{3,}", "\n\n", body).strip()
        header = (
            f"# {title}\n\n"
            f"This reference covers `{version}`, generated from spec {tag}.\n\n"
        )
        (PAGES / page).write_text(header + body + "\n")


if __name__ == "__main__":
    main(*sys.argv[1:])
