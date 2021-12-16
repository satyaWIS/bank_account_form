let validData = {};
let address = {};

const transformer = (data) => {
  address["pincode"] = data.zip;
  address["city"] = data.city;
  address["state"] = data.state;
  address["addr1"] = data.addr1;
  address["addr2"] = data.addr2;
  validData["address"] = address;
  validData["firstName"] = data.firstName;
  validData["lastName"] = data.lastName;
  validData["email"] = data.email;

  return validData;
};

export const validateContactNos = (contactNos) => {
  let isValid = true;
  contactNos.forEach((contactNo) => {
    console.log(contactNo.phoneNumber.length);
    if (contactNo.phoneNumber.length !== 10) {
      isValid = false;
    }
  });
  return isValid;
};

export default transformer;
