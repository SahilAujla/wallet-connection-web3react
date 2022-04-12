import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";

export const truncateAddress = (address) => {
    if (!address) return "No Account";
    const match = address.match(
      /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
    );
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  };
  
  export const toHex = (num) => {
    const val = Number(num);
    return "0x" + val.toString(16);
  };


export const proof = (address) => {
  const addresses = ["0x2dA582fee0E7107dcaC20306f2B83509d847E8e2", "0x0968263a92a3B11e0edD1C699f6E7E79406E850A", "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"];

  // Hash addresses to get the leaves
  let leaves = addresses.map(addr => keccak256(addr));

  // Create tree
  let merkleTree = new MerkleTree(leaves, keccak256, {sortPairs: true});
  // Get root
  let rootHash = merkleTree.getRoot().toString('hex');

  // 'Serverside' code
  let hashedAddress = keccak256(address);
  let proof = merkleTree.getHexProof(hashedAddress);

  // Check proof
  let v = merkleTree.verify(proof, hashedAddress, rootHash);
  console.log(v); // returns boolean
  return v;
}