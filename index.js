const axios = require("axios");
const sharp = require("sharp");
const jsqr = require("jsqr");

const imageUrl =
  "https://shimano-dev-local.s3.ap-south-1.amazonaws.com/PLS20240037/qr-152410023434199.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCmFwLXNvdXRoLTEiRjBEAiBSeEOfaUaarwS3uRX9IW9OF5KgvqLNgdNGLA%2BCmmG1QwIgCceI72TCMi%2B0WqyFgpQgfV3VwbjZEkvOZfDCrZb5O4kqhQMIPxAAGgw5NTc5OTk3NDE2NDIiDHxlOWdBEkSES9jZdSriAnN8hSdRtbeF0s6Xztn47qHX4OhywCm9eFmzDIpqargztEo6xXHft19aBaTlSPI2wwl%2BJSExG2KE6VuPE4aUJYY3LgizXKd8IAtJUhj0qwFu2D2DpbY6MeqA0V%2BrTZGVL0QBdgFzBbZ%2FLrpgNzoznqduLwSp%2B2QrX%2F6QQjxaHslOQH%2F%2B8luoca9NPwv%2FKP2RanplRT8cfnCoHTyo0ysRueNsZJoCWHEfQ1YTcx0C%2BT%2BvBwEoaPdy%2FNh38Z3LqseyZ7CQ8b%2BKeBIVXFny6%2FXieKrnK95cOiq9qHROwu%2BSGSfSr3uY6uSkeXVB%2BgcVsVKhjtKhRlNjlA8EynrZB8BpL9A9zRJC14ur0nV%2BtorQVUVGRctQJrUxPAtJu5%2BYGra4JlryIrtWKFlcPnMaqBcK7l2cyXsGA7kXx%2BNWT9owxFlMwOMwu7JAHayTBiitlMw%2F2S5pCEX9%2BprfA1Z0DSXOG4YHSDCo2qm3Bjq0AtpsSNH4NE711IbXKUjPcZqFt4DSKirmWO2v%2BdAYayK1WhQkTkmhJlef3k3eTe3rNCGCOcBXSVZKzOV6zvNFV8m7sRJOm1g6YP7lNtVFBHeKwF9QebfpzeInQS2TXLiwbBzn6wQCoLi0V3M95XOD%2BpriUkYYWRqlc4LKq5jNV3W2QCrSgjVbwzmUyo%2FWX%2FOyj6bCg73ziWD56YQe9WTImOcdJawt%2Fc0ZTG%2Fvq6KUpRguuf94NaX5NT%2FoOwxVYuBCkbrJHbTas9N6PcpJBCLK1ohnQZsPxLRISvlewxCwV3F5e8TIu85Nxn3J4Z1EgMt%2F1YCd9hG2PxuoFb2HkOvMyc2rVvTlAv%2FVbD%2FAIwqGqBJCVftJrY0F5e25RWyuPutcfYtMleOmozMPNPTz6BuS3%2BRDzbk3&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240918T074157Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIA56DJ37LFOZZKBXNL%2F20240918%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=186cafcafdb393c763e3b4ca3f0f6665f8ecfadb4e082e953ef2b918cab28a1e";

axios
  .get(imageUrl, { responseType: "arraybuffer" })
  .then((response) => {
    const buffer = Buffer.from(response.data);

    return sharp(buffer)
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
  })
  .then(({ data, info }) => {
    const imageData = new Uint8ClampedArray(data);
    const code = jsqr(imageData, info.width, info.height);

    if (code) {
      console.log("Decoded QR code data:", code.data);
    } else {
      console.error("No QR code found.");
    }
  })
  .catch((err) => {
    console.error("Error processing image:", err);
  });

