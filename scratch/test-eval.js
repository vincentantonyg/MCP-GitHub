// Native global fetch used

async function main() {
  const payload = {
    query: "Patient Diagnostic Report Sharing ACs",
    context: ["WhatsApp message must include secure download link with expiration (24 hours). Support for PDF format with encryption."],
    output: "TC_123: Verify that the diagnostic report link is sent to WhatsApp with PDF encryption, and expires in 24 hours.",
    expected_output: "The system should send an encrypted PDF report to patient WhatsApp with a 24-hour expiration link.",
    metric: ["faithfulness"]
  };

  const start = Date.now();
  console.log('Sending request to evaluation server...');
  try {
    const response = await fetch('http://localhost:8000/eval', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    console.log(`Server responded in ${Date.now() - start}ms: status=${response.status}`);
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error reaching evaluation server:', err.message);
  }
}

main();
