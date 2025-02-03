import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faTwitter,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

const SocialMediaIcons = ({ links }) => {
  return (
    <div className="flex justify-center mt-4 space-x-4">
      <a href={links.youtube} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon
          icon={faYoutube}
          size="2x"
          className="text-primary hover:text-purple-700"
        />
      </a>
      <a href={links.twitter} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon
          icon={faTwitter}
          size="2x"
          className="text-primary hover:text-purple-700"
        />
      </a>
      <a href={links.instagram} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon
          icon={faInstagram}
          size="2x"
          className="text-primary hover:text-purple-700"
        />
      </a>
      <a href={links.tiktok} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon
          icon={faTiktok}
          size="2x"
          className="text-primary hover:text-purple-700"
        />
      </a>
    </div>
  );
};

export default SocialMediaIcons;
