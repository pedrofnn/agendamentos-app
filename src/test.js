const divs3 = document.querySelectorAll(".x1n2onr6.xyorhqc.x150wa6m.x1bnvlk4");

Array.from(document.querySelectorAll(".x1n2onr6.xyorhqc.x150wa6m.x1bnvlk4")).map((div) => {
  let contactName = div.querySelector("._ak72._ak7e ._ak8q");
  let contactNumber = div.querySelector(".xexx8yu.xmns6w2.x18d9i69.xpkgp8e.xdj266r.x150wa6m ._ao3e");
  const contact = {
    name: contactName.textContent,
    phoneNumber: contactNumber.textContent
  } 
  return contact;
});

/*

Div
x1n2onr6 xyorhqc x150wa6m x1bnvlk4

nameDiv
_ak72 _ak7e

Phone
xexx8yu xmns6w2 x18d9i69 xpkgp8e xdj266r x150wa6m

*/