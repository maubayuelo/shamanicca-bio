import SocialIcons from "./SocialIcons";

const Slider = ({ novelties }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-">Next Novelties</h2>
      <p>Our App and Store are in the building process.</p>
      <div className="flex overflow-x-scroll space-x-4 mt-4">
        {novelties?.map((novelty, index) => (
          <div key={index} className="min-w-[200px]">
            <img src={novelty.image} alt={novelty.title} className="rounded" />
            <p className="mt-2 text-sm">{novelty.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const NoveltiesSlider = ({ novelties, brand }) => {
  return (
    <div className="p-3">
      {/* <Slider novelties={novelties} /> */}
      <p className="text-center uppercase font-bold">
        For important Updates, Follow Us!
      </p>
      <SocialIcons brand={brand} />
    </div>
  );
};

export default NoveltiesSlider;
