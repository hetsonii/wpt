test(() => {
  assert_equals(resources_script_result, 'loaded from webbundle');
},
'A subresource script.js should be loaded from WebBundle using the relative ' +
'URL and a base element.');

promise_test(async () => {
  const module = await import("/web-bundle/resources/wbn/dynamic/resource1.js");
  assert_equals(module.result, "resource1 from dynamic1.wbn");
  const module2 = await import("/web-bundle/resources/wbn/dynamic/resource2.js");
  assert_equals(module2.result, "resource2 from dynamic1.wbn");
  const module3 = await import("/web-bundle/resources/wbn/dynamic/resource3.js");
  assert_equals(module3.result, "resource3 from dynamic1.wbn");
  const module4 = await import("/web-bundle/resources/wbn/dynamic/resource4.js");
  assert_equals(module4.result, "resource4 from dynamic1.wbn");
  const result_promise = new Promise((resolve) => {
    // This function will be called from script.js
    window.report_result = resolve;
  });

  const script = document.createElement('script');
  script.src = "/web-bundle/resources/wbn/dynamic/classic_script.js";
  document.body.appendChild(script);
  assert_equals(await result_promise, "classic script from network");
}, "Subresources that start with 'resource' should be loaded from dynamic1.wbn while others from network.");
