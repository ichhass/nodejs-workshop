/**
 * Created on 18.10.14.
 */
function RegisterForm(elem) {
	this.elem = elem;

	this.elem.onsubmit = this.onSubmit.bind(this);
}

RegisterForm.prototype.onSubmit = function(event) {

	var xhr = new XMLHttpRequest();

	xhr.open('POST', '/register', true);
	xhr.onload = function() {
		alert.(this.responseText);
	};

	xhr.send(new FormData(this.elem));

	return false;

};