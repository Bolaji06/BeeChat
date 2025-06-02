/* eslint-disable @typescript-eslint/no-explicit-any */
// Dynamic imports for better Next.js compatibility
export const formatTextContent = async (content: string): Promise<string> => {
  try {
    const [
      { unified },
      { default: remarkParse },
      { default: remarkRehype },
      { default: rehypeStringify },
      { default: rehypePrettyCode },
      { transformerCopyButton },
      { default: remarkGfm },
    ] = await Promise.all([
      import("unified"),
      import("remark-parse"),
      import("remark-rehype"),
      import("rehype-stringify"),
      import("rehype-pretty-code"),
      import("@rehype-pretty/transformers"),
      import("remark-gfm"),
    ]);

    const processor = unified()
      .use(remarkParse)
      .use(remarkRehype, {
        allowDangerousHtml: true, // Allow HTML in markdown
      })
      .use(remarkGfm)
      .use(rehypePrettyCode, {
        theme: "github-dark",
        keepBackground: true,
        transformers: [
          transformerCopyButton({
            visibility: "hover",
            feedbackDuration: 3_000,
          }),
        ],
        onVisitLine(node: any) {
          if (node.children.length === 0) {
            node.children = [{ type: "text", value: " " }];
          }
        },
        onVisitHighlightedLine(node: any) {
          node.properties.className = ["line--highlighted"];
        },
        onVisitHighlightedChars(node: any) {
          node.properties.className = ["word--highlighted"];
        },
      })
      .use(rehypeStringify, {
        allowDangerousHtml: true,
      });

    const result = await processor.process(content);
    return String(result);
  } catch (error) {
    console.error("Markdown processing error:", error);
    return content;
  }
};
