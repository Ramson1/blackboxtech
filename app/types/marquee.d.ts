/* eslint-disable @typescript-eslint/no-namespace */
import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      marquee: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          behavior?: string;
          direction?: string;
          scrollamount?: string;
        },
        HTMLElement
      >;
    }
  }
}
