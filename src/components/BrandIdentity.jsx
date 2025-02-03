import SocialIcons from "./SocialIcons";

const BrandIdentity = ({ brand }) => {
  return (
    <div className="text-center pl-3 pr-3">
      {/* Thumbnail Image */}
      <img
        src={brand.thumb}
        alt="Thumbnail"
        className="mx-auto h-36 w-36 rounded-full mb-6"
      />
      {/* Logo Image */}
      <img src={brand.logo} alt="Shamanicca Logo" className="mx-auto h-10" />
      <h1 className="text-md font-bold mt-3">{brand.slogan}</h1>
      <SocialIcons brand={brand} />
    </div>
  );
};

export default BrandIdentity;
