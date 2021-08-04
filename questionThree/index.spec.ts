import { getNavValue } from ".";

const MOCK_CONTENT =
  '<!DOCTYPE html><html><head><title>Code Quiz</title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Code Quiz</h1><script>function logout() {\n' +
  "  document.cookie = 'hasCookie=';\n" +
  "  location.reload();\n" +
  '}</script><p>Funds NAV</p><table><tr><th>Fund Name</th><th>Nav </th><th>Bid</th><th>Offer</th><th>Change</th></tr><tr><td>B-INCOMESSF</td><td>10.0548</td><td>10.0549</td><td>10.0548</td><td>0.0107</td></tr><tr> <td>BM70SSF </td><td>9.9774</td><td>9.9775</td><td>9.9774</td><td>0.0927</td></tr><tr> <td>BEQSSF</td><td>11.247</td><td>11.2471</td><td>11.247</td><td>0.1319</td></tr><tr> <td>B-FUTURESSF</td><td>11.443</td><td>11.4431</td><td>11.443</td><td>0.1488</td></tr></table><input type="button" value="Logout" onclick="logout()"></body></html>';

describe("get Nav value ", () => {
  it("should return 11.247 with BEQSSF", async () => {
    const result = await getNavValue(MOCK_CONTENT, "BEQSSF");
    expect(result).toEqual("11.247");
  });
  it("should return 9.9774 with BM70SSF", async () => {
    const result = await getNavValue(MOCK_CONTENT, "BM70SSF");
    expect(result).toEqual("9.9774");
  });

  it("should throwError", async () => {
    expect(getNavValue(MOCK_CONTENT, "MOCK_NOTHING")).rejects.toEqual(null);
  });
});
