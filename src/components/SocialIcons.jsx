import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faXTwitter,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

const SocialIcons = ({ brand }) => {
  return (
    <>
      <div className="flex justify-center mt-6 mb-6 space-x-4">
        {brand?.social?.youtube && (
          <a
            href={brand.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          </a>
        )}
        {brand?.social?.twitter && (
          <a
            href={brand.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faXTwitter} size="2x" />
          </a>
        )}
        {brand?.social?.instagram && (
          <a
            href={brand.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
        )}
        {brand?.social?.tiktok && (
          <a
            href={brand.social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTiktok} size="2x" />
          </a>
        )}
      </div>
    </>
  );
};

export default SocialIcons;
