from pathlib import Path
from xml.etree import ElementTree


SITE_URL = "https://bahnberge.de"
ROOT = Path(__file__).resolve().parent.parent
SITEMAP_PATH = ROOT / "sitemap.xml"
NAMESPACE = "http://www.sitemaps.org/schemas/sitemap/0.9"


def main():
    ElementTree.register_namespace("", NAMESPACE)
    urlset = ElementTree.Element(f"{{{NAMESPACE}}}urlset")

    for page in sorted(ROOT.glob("*.html")):
        location = SITE_URL + ("/" if page.name == "index.html" else f"/{page.name}")
        url = ElementTree.SubElement(urlset, f"{{{NAMESPACE}}}url")
        ElementTree.SubElement(url, f"{{{NAMESPACE}}}loc").text = location

    ElementTree.indent(urlset, space="  ")
    ElementTree.ElementTree(urlset).write(
        SITEMAP_PATH,
        encoding="utf-8",
        xml_declaration=True,
    )
    print(f"Generated {SITEMAP_PATH.name} with {len(urlset)} URLs.")


if __name__ == "__main__":
    main()
