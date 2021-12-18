/**
 * @description 载入<scriptx>标签中的script内容(相当于变相的<script>)
 */
{
	let scripts = [];
	let text;
	for (let element of document.getElementsByTagName('scriptx')) {
		text = element.textContent;
		scripts.push(text);
		element.style.display = 'none';
	}
	function addScriptAsynchronously(sourceCode) {

		let script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.textContent = sourceCode;
		document.head.appendChild(script);
	}
	for (let i = 0, url; i < scripts.length; i++) {
		sourceCode = scripts[i];
		addScriptAsynchronously(sourceCode);
	}
}
