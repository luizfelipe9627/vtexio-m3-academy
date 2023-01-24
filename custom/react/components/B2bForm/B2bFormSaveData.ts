import MasterDataRest from "../../services/MasterData";
import { FormFields } from "./B2bForm";

const clientMasterData = new MasterDataRest("CL");
const addressMasterData = new MasterDataRest("AD");

export default async function saveData({
    firstName,
    lastName,
    email,
    phone,
    businessPhone,
    city,
    complement,
    corporateDocument,
    corporateName,
    neighborhood,
    number,
    postalCode,
    state,
    stateRegistration,
    street,
    tradeName
}: FormFields) {

    const clienteData = {
        isCorporate: true,
        isNewsletterOptIn: true,
        firstName,
        lastName,
        email,
        phone,
        tradeName,
        businessPhone,
        corporateName,
        stateRegistration,
        corporateDocument
    };


    const client = await clientMasterData.post(clienteData);

    const addressData = {
        addressName: "Endereço de entrega principal",
        addressType: "commercial",
        country: "BRA",
        receiverName: `${firstName} ${lastName}`,
        postalCode,
        street,
        number,
        complement,
        ReferenceError,
        neighborhood,
        city,
        state,
        userId: client.data.Id.substring(3)
    };

    await addressMasterData.post(addressData);

}
