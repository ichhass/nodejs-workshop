/**
 * Created on 15.10.14.
 */
function* testMe() {
	try {
		var result = yield "test";
		console.log("<-", result);
	} catch (e) {
		console.log("<-", e);
	}

//	return "done";
}

var generator = testMe();

console.log("->", generator.next());

setTimeout(function() {
	generator.throw(new Error("and quite a problem here!"));
}, 1000);