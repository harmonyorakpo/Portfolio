// Contact address, kept out of reach of address-harvesting bots.
//
// The address is never written as a literal `name@host` string anywhere in the
// source or the shipped bundle — it is stored in pieces and assembled in the
// browser at call time. Bots that scrape the served HTML or regex the JS bundle
// for an email pattern find nothing; real users still see and click it normally.
const USER = ["harmony", "orakpo"];
const DOMAIN = ["gmail", "com"];
const AT = String.fromCharCode(64); // "@"

export const getEmail = () => `${USER.join("")}${AT}${DOMAIN.join(".")}`;

export const mailtoHref = () => `mailto:${getEmail()}`;
