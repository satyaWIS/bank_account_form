let validData = {};
let address = {};
let contactNos = [];

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
  contactNos.push(data.phoneNumber);
  validData["contactNos"] = contactNos;

  return validData;
};

export default transformer;
