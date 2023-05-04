import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

export default function FeaturedInfo(props) {
  // console.log("patients",props.doctor.patients);
  
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Total No. of Patients</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{props.length}</span>
          {/* <span className="featuredMoneyRate">
            -11.4 <ArrowDownward  className="featuredIcon negative"/>
          </span> */}
        </div>
        <span className="featuredSub">Yet to be Normal</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Patients at High Risk</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{props.high}</span>
          {/* <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span> */}
        </div>
        <span className="featuredSub">God Bless Them</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Gender Ratio</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">Male : {props.male} <br/>  Female : {props.female}</span>
          {/* <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span> */}
        </div>
        <span className="featuredSub">Believe in Gender Equality</span>
      </div>
    </div>
  );
}