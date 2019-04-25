const icanvas = document.createElement('iframe');
icanvas.style = `
	position:fixed;
	top:0;
	left:0;
	width:100%;
	height:100%;
	pointer-events:none;
	z-index:9999;
	border:none;
`;
const icannon = document.createElement('iframe');
icannon.style = `
	position:fixed;
	top:0;
	left:0;
	width:20px;
	height:20px;
	z-index:99999;
	border:none;
`;
digestMessage(window.location.href).then(digestValue => {
	const sha = hexString(digestValue)
	icanvas.src = 'https://idmk.snowsore.com/'// + sha;
	icannon.src = 'https://idmk.snowsore.com/cannon/'// + sha;
	document.body.appendChild(icanvas);
	document.body.appendChild(icannon);
});


//SHAing
function hexString(buffer) {
	const byteArray = new Uint8Array(buffer);

	const hexCodes = [...byteArray].map(value => {
		const hexCode = value.toString(16);
		const paddedHexCode = hexCode.padStart(2, '0');
		return paddedHexCode;
	});

	return hexCodes.join('');
}

function digestMessage(message) {
	const encoder = new TextEncoder();
	const data = encoder.encode(message);
	return window.crypto.subtle.digest('SHA-256', data);
}


