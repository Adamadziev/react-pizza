import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={480}
    viewBox="0 0 280 480"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="83" cy="153" r="2" />
    <rect x="0" y="287" rx="0" ry="0" width="280" height="0" />
    <rect x="0" y="269" rx="10" ry="10" width="260" height="20" />
    <rect x="0" y="303" rx="10" ry="10" width="260" height="88" />
    <rect x="0" y="402" rx="10" ry="10" width="95" height="35" />
    <rect x="117" y="399" rx="25" ry="25" width="140" height="45" />
    <circle cx="129" cy="130" r="130" />
  </ContentLoader>
);

export default Skeleton;
