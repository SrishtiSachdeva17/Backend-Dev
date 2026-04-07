import { createMember } from "../service/memberService.js";

async function addMember(name, membershipType) {
    return createMember(name, membershipType);
}

export default addMember;
