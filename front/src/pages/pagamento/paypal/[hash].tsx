import type { Page } from "@/types/page.types";
import type { GetServerSideProps } from "next";

import { AppTemplate, Seo } from "@/components";
import RiboAdapter from "@/libs/ribo-adapter";
import { getPage } from "@/requests";

export const getServerSideProps: GetServerSideProps = async ({ resolvedUrl }) => {
  const page = await getPage("pagamento/paypal/{hash}").catch((e) => {
    console.log(e);
    return Promise.reject(e);
  });
  const hash = resolvedUrl.replace("/pagamento/paypal/", "");
  return { props: { ...page, resolvedUrl, hash } };
};

interface SSWPagesProps extends Page {
  resolvedUrl: string;
  hash?: string;
}

const Page = ({
  authenticated = false,
  resolvedUrl,
  hash,
  children,
  title,
  description,
  image,
  canonical,
  robots,
  url,
  ...props
}: SSWPagesProps) => {
  const seo = { title, description, image, canonical, robots, url };
  return (
    <>
      <Seo {...seo} />
      <AppTemplate {...props}>
        <RiboAdapter>
          {{
            component: "DynamicContent",
            path: `carts/${hash}`,
            status: { default: children },
          }}
        </RiboAdapter>
      </AppTemplate>
    </>
  );
};

export default Page;


[
Cerveja Heineken 330ml\t1100
Água 1,5L\t600
Coca Cola 350ml\t650
Coca Cola Zero 350ml\t650
Água com gás 500ml\t350
3 Corações \t1050
Red Bull 250ml\t1390
H2O LIMONETO\t800
Nescau 180ml\t450
Scheweppes 350ml\t650
YoPro 250ml\t1450
Amendoim\t550
Bauducco Wafer\t450
Bauducco Cookie\t450
Doritos\t450
Barra de Chocolate Hershey's \t990
Café Melita\t1490
Twix\t200
Barra de Cereal\t450
Barra de Granola \t450
Aparelho de Barbear\t790
Escova de Dente\t890
Absorvente  - Unidade\t200
Pasta de Dente\t820
Sabonete \t790
Suco 180m\t480
]


  [
  "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2FblgbnAcCWQFCkIK0St4F.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2FbzyzRyWwY3ZfJV2VjRia.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2FR3yqsr3YaJXKVqDGb569.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2FMT1DRivxcAAadZCbncNW.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2FAWNfEUV2vDBDodV1GNIw.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2FpQYZgMOeuQFeiNuNHVAS.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2F3tk4Q1vceleLwdLNRxt2.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2FsPBm8btSxjOGHAYJFjsy.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2FmMiaihfOWstwn5iBQPlo.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2FNtt728SGykPaBUspsauF.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2FKCXapy1wO6NujRaslMHo.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2FpNSS1UL7miRLIjokV40c.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/gallery%2FMTDFH3KqkVONSAprDNLG.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2F25reOkwDQEdwKoZ3vKCH.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2FeUgVNCIDYEwONRsASmnc.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2FdMVIQqMr2b5VE97YjzCm.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2FHflUDdJc07PHBCgrU8df.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2Fp4rFjWC2yjKnPPfyVfXC.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2FHGLkfgLf68Y5VD4XWc4U.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2FnCyqP7AUYd7g7Dh4D9go.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2FH4Uh7HfVsUOAvoNQhtW5.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2FjRHdHCAFVglcKjlgIjvZ.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2FzOGGulZKMwhbnAbZokij.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2FUgwwKOyaY4XoRlnQth1k.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2FLKmbFdMmFOo9EmMOzWMQ.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2FGlVj6N4sHicgBvY7dKLl.jpg?alt=media",
    "https://www.pedidoslink.com/cdn-cgi/image/width=640,height=480,fit=cover/https://firebasestorage.googleapis.com/v0/b/stores-44690.appspot.com/o/products%2FtTe5QCQxKt2FFqpV1eU2.jpg?alt=media"
  ]
