import React, { useState } from "react";
import { PaperEmbeddedWalletSdk } from "@paperxyz/embedded-wallet-service-sdk";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

function Nft() {
  const [user, setUser] = useState("");
  const sdk = new PaperEmbeddedWalletSdk({
    clientId: "711b7df1-933f-4092-a0f5-ac83e5dc574d",
    chain: "Mumbai",
  });
  async function minting() {
    const sdk = ThirdwebSDK.fromPrivateKey(
      // Learn more about securely accessing your private key: https://portal.thirdweb.com/sdk/set-up-the-sdk/securing-your-private-key
      "355a180b3561dbb2cb83d32c792cf7b256b723940c4c08cc49414b90e54b3f0f", //ADMIN_PRIVATE_KEY,
      "Mumbai"
    );

    const nftCollection = await sdk.getNFTCollection(
      "0xAE6078005B5793FB8577e8f2814083DF4b1397F6"
    ); //NFT collection address

    // Set the metadata for the NFT to the product information
    const metadata = {
      name: "lorem", //nft title
      description: "ipsum", //nft descripiton
      image: "www.google.com", //nft image
    };

    const walletAddress = user.walletAddress;

    // Mint the NFT
    const minted = await nftCollection.mintTo(walletAddress, metadata);

    console.log("Successfully minted NFT!", minted);
  }
  return (
    <Container>
      <Button
        onClick={() =>
          sdk.auth.loginWithPaperModal().then(async () => {
            setUser(await sdk.getUser());
            await minting();
          })
        }
      >
        Connect with Paper
      </Button>
    </Container>
  );
}

export default Nft;
