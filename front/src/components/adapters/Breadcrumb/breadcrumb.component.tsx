import { BreadcrumbProps, Link } from "@/components";
import { Breadcrumb as MarsBreadcrumb } from "@andrevantunes/andrevds";

const Breadcrumb = (props: BreadcrumbProps) => <MarsBreadcrumb {...props} componentLink={Link} />;

export default Breadcrumb;
