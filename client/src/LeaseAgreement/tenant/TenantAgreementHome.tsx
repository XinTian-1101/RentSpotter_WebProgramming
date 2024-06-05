import "TenantPOV/tenantapplication.css";
import axios from "axios";
import PropertyCard, {
  PropertyCardProps,
} from "component/AgreementComponents/property-card";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// declare module "jsonwebtoken" {
//   export interface UserIDJwtPayload extends jwt.JwtPayload {
//     userId: string;
//   }
// }

interface IToken {
  token: string;
  userId: string;
}

interface ILeaseAgreement {
  _id: string;
  tenantId: string;
  landlordId: string;
  propertyId: string;
  applicationId: string;
  leaseStatus: string;
  day: string;
  month: string;
  year: string;
  lessorName: string;
  lessorIc: string;
  lesseeName: string;
  address: string;
  effectiveDate: string;
  expireDate: string;
  rentRmWord: string;
  rentRmNum: string;
  advanceDay: string;
  depositRmWord: string;
  depositRmNum: string;
  lessorAdd: string;
  lessorTel: string;
  lessorFax: string;
  lesseeAdd: string;
  lesseeTel: string;
  lesseeFax: string;
  lessorDesignation: string;
  lessorSignature: string;
  lesseeIc: string;
  lesseeDesignation: string;
  lesseeSignature: string;
  completed: boolean;
  PDF: string;
}

interface IProperty {
  landlordId: string;
  name: string;
  type: string;
  address: string;
  location: string;
  postcode: string;
  bedroom: number;
  bathroom: number;
  furnishing: string;
  parking: number;
  floorLevel: number;
  buildUpSize: number;
  facilities: string;
  accessibility: string;
  price: string;
  description: string;
  coverPhoto: string;
  photos: string[];
}

interface ICombination {
  property: IProperty;
  leaseAgreement: ILeaseAgreement;
  locationOwner: string;
}

const TenantAgreementHome = () => {
  const [leaseAgreementList, setLeaseAgreementList] = useState<
    ILeaseAgreement[] | []
  >([]);
  const [propertyListingInfo, setPropertyListingInfo] = useState<
    ICombination[] | []
  >([]);
  const [propertyOtherListingInfo, setPropertyOtherListingInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const decodedToken = jwtDecode<IToken>(token);
    const userId = decodedToken.userId;
    async function fetchLeaseAgreements() {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/leaseAgreement/getLeaseAgreements/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Lease agreements fetched:", response.data);
        setLeaseAgreementList(response.data);
      } catch (err) {
        console.error("Error fetching applications data:", err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load application data!",
          confirmButtonColor: "#FF8C22",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchLeaseAgreements();
  }, []);

  useEffect(() => {
    setLoading(true);
    async function fetchPropertyInfo() {
      try {
        const promises = leaseAgreementList.map(async (leaseAgreement) => {
          const response = await axios.get(
            `/api/applications/ViewProperty/${leaseAgreement.propertyId}`
          );
          const property: IProperty = response.data;
          const landlordName = await axios.get(
            `/api/users/${response.data.landlordId}`
          );
          console.log(
            "Property fetched for application:",
            leaseAgreement,
            property,
            landlordName
          );
          const element: ICombination = {
            leaseAgreement: leaseAgreement,
            property: property,
            locationOwner: landlordName as unknown as string,
          };
          return {
            property: response.data,
            leaseAgreement,
            locationOwner: landlordName.data.data.username,
          };
        });

        const propertyData: any = await Promise.all(promises);
        setPropertyListingInfo(propertyData);
      } catch (err) {
        console.error("Error fetching property data:", err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load property data!",
          confirmButtonColor: "#FF8C22",
          customClass: {
            confirmButton: "my-confirm-button-class",
          },
        });
      } finally {
        setLoading(false);
      }
    }
    if (leaseAgreementList.length > 0) {
      fetchPropertyInfo();
    } else {
      setPropertyListingInfo([]);
      setLoading(false);
    }
    fetchPropertyInfo();
  }, [leaseAgreementList]);
  // const propertyActionListingInfo: PropertyCardProps[] = [
  //   {
  //     imageUrl: "Images/commercial2.jpg",
  //     title: "Tiara Damansara's Master Room Unit 315/3",
  //     locationOwner: "PETALING JAYA | CONDO by Ali bin Abu",
  //     bedroom: 1,
  //     bathroom: 2,
  //     sqft: "1250 Sqft",
  //     price: "RM 500",
  //     status: "viewLease",
  //   },
  // ];

  // const propertyOtherListingInfo: PropertyCardProps[] = [
  //   {
  //     imageUrl: "Images/propertyImg3.png",
  //     title: "Sekeyen 15, Unit 34",
  //     locationOwner: "Sekeyen 15, Unit 34",
  //     bedroom: 1,
  //     bathroom: 2,
  //     sqft: "1250 Sqft",
  //     price: "RM 500",
  //     status: "active",
  //   },
  // ];

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <main>
          <div className="pageMainContainer">
            <h1 className="pageMainTitle">Lease Agreements</h1>
            {/* <h2 className="applicationSubTitle">Action Needed</h2> */}
            {propertyListingInfo.map((info, index) => (
              <PropertyCard
                key={index}
                leaseAgreementId={info.leaseAgreement._id}
                imageUrl={info.property.coverPhoto}
                title={info.property.name}
                locationOwner={info.locationOwner}
                bedroom={info.property.bedroom}
                bathroom={info.property.bathroom}
                sqft={info.property.buildUpSize}
                price={info.property.price}
                status={info.leaseAgreement.leaseStatus}
              />
            ))}
          </div>
        </main>
      )}
    </>
  );
};

export default TenantAgreementHome;