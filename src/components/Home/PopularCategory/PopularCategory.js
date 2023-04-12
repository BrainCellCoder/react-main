import React from "react";
import "./PopularCategory.css";
import tvPic from "./Cattv.jpg";
import cameraPic from "./Catcamera.png";
import gamingPic from "./Catgaming.png";
import landlinePic from "./Catlandline.png";
import radioPic from "./Catradio.png";
import speakerPic from "./Catspeaker.png";

export const PopularCategory = () => {
  return (
    <>
      {/* <h3 className="popular-category-heading">Popular Categories</h3> */}
      <div className="container" id="popular-category">
        <div className="popular-category-list">
          <div>
            <div
              className="popular-category-image"
              style={{ backgroundImage: `url(${tvPic})` }}
            ></div>
            <div className="popular-category-name">Televisions</div>
          </div>
          <div>
            <div className="popular-category-image">
              <img src={cameraPic} alt="img" />
            </div>
            <div className="popular-category-name">Cameras</div>
          </div>
          <div>
            <div className="popular-category-image">
              <img src={gamingPic} alt="img" />
            </div>
            <div className="popular-category-name">Gamings</div>
          </div>
          <div>
            <div className="popular-category-image">
              <img src={landlinePic} alt="img" />
            </div>
            <div className="popular-category-name">Landlines</div>
          </div>
          <div>
            <div className="popular-category-image">
              <img src={radioPic} alt="img" />
            </div>
            <div className="popular-category-name">Radios</div>
          </div>
          <div>
            <div className="popular-category-image">
              <img src={speakerPic} alt="img" />
            </div>
            <div className="popular-category-name">Speakers</div>
          </div>
        </div>
      </div>
    </>
  );
};
