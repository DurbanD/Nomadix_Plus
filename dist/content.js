const passthruDropDownID = 'ndxPassthruDD';
const passthruHelpBtnID = 'ndxPassthruBtnTop';
const ndxHelpContainerID = 'ndxHelpContainer';
const formInputID = 'ndxBulkInput';
const bgColorDefault = '#EAEAEA';
const bgColorDefaultBtn = '#DADADA';
const btnHoverDefault = '#BABABA';
// Width, Height
const collapsedSize = ['40px', '25px'];
const expandedSize = ['250px', '400px'];

// ELEMENTS

const createTopBtn = function (id) {
  let btn = document.createElement('div');
  btn.id = id;
  btn.innerText = 'NDX+';

  // Button Styling
  // btn.style.height = collapsedSize[1]
  // btn.style.width = collapsedSize[0]
  // btn.style.cursor = 'pointer'
  // btn.style.display = 'flex'
  // btn.style.flexDirection = 'column'
  // btn.style.alignContent = 'center'
  // btn.style.justifyContent = 'center'
  // btn.style.textAlign = 'center'
  // btn.style.padding = '2px'
  // btn.style.margin = '0'
  // btn.style.boxSizing = 'border-box'
  styleTopButton(btn);

  // Event Listeners
  btn.addEventListener('mouseover', () => {
    btn.style.background = 'rgba(0,0,0,0.5)';
  });
  btn.addEventListener('mouseout', () => {
    btn.style.background = 'inherit';
  });
  btn.addEventListener('click', () => {
    let dropdown = createDropdown(passthruDropDownID),
      parent = btn.parentElement;
    if (!parent) return;
    parent.removeChild(btn);
    parent.appendChild(dropdown);
  });
  return btn;
};
const createSubmitBtn = function (type, action) {
  let submitBtn = document.createElement('div');
  if (action === 'add') {
    submitBtn.innerText = 'Add';
    submitBtn.style.color = 'darkgreen';
  }
  if (action === 'del') {
    submitBtn.innerText = 'Delete';
    submitBtn.style.color = 'darkred';
  }
  styleButton(submitBtn);
  if (type === 'passthru') {
    submitBtn.id = 'ndxBulkPassthruSubmit';
    submitBtn.addEventListener('click', async () => {
      let formInput = document.getElementById(formInputID),
        inputArray = [];
      if (!formInput) return;
      inputArray = listToArray(formInput.value);
      formInput.value = '';
      if (inputArray.length > 0) {
        let ndxMain = document.getElementById(ndxHelpContainerID);
        submitBtn.innerText = 'Please Wait...';
        submitBtn.style.cursor = 'auto';
        document.body.style.cursor = 'progress';
        if (ndxMain) ndxMain.style.cursor = 'progress';
        await handlePassthroughArray(action, document.location.host, inputArray);
        submitBtn.innerText = 'COMPLETE';
        submitBtn.style.cursor = 'pointer';
        document.body.style.cursor = 'auto';
        if (ndxMain) ndxMain.style.cursor = 'auto';
        location.reload();
      }
    });
  }
  return submitBtn;
};
const createCloseBtn = function () {
  let closeBtn = document.createElement('div');
  closeBtn.id = 'ndxBulkPassthruClose';
  closeBtn.innerText = 'X';
  styleCloseButton(closeBtn);
  closeBtn.addEventListener('mouseover', () => {
    closeBtn.style.background = btnHoverDefault;
  });
  closeBtn.addEventListener('mouseout', () => {
    closeBtn.style.background = bgColorDefaultBtn;
  });
  closeBtn.addEventListener('click', () => {
    let passthruBtnTop = createTopBtn(passthruHelpBtnID),
      ndxContainer = document.getElementById(ndxHelpContainerID);
    if (!ndxContainer) return;
    for (let node of ndxContainer.childNodes) ndxContainer.removeChild(node);
    ndxContainer.appendChild(passthruBtnTop);
  });
  return closeBtn;
};
const createInputContainer = function (id) {
  let inputContainer = document.createElement('div');
  let label = document.createElement('strong');
  let textarea = document.createElement('textarea');
  styleInputContainer(inputContainer);
  inputContainer.id = id;
  label.innerText = 'IP/DNS Addresses:';
  textarea.id = formInputID;
  textarea.style.width = '95%';
  textarea.style.height = '90%';
  textarea.style.border = '1px solid black';
  inputContainer.appendChild(label);
  inputContainer.appendChild(textarea);
  return inputContainer;
};
const createButtonContainer = function (id) {
  let btnContainer = document.createElement('div');
  btnContainer.id = id;
  btnContainer.appendChild(createSubmitBtn('passthru', 'add'));
  btnContainer.appendChild(createSubmitBtn('passthru', 'del'));
  btnContainer.style.display = 'flex';
  btnContainer.style.width = '100%';
  btnContainer.style.height = '20%';
  btnContainer.style.justifyContent = 'space-around';
  btnContainer.style.alignContent = 'center';
  btnContainer.style.alignItems = 'center';
  return btnContainer;
};
const createDropdown = function (id) {
  let dropdown = document.createElement('div');
  dropdown.id = id;
  styleDropdown(dropdown);

  // Head
  let head = document.createElement('h3');
  head.innerText = "Enter addresses below.";

  // Input Container
  // let inputContainer = document.createElement('div')
  // inputContainer.id = 'ndxBulkPatthruInputContainer'
  // styleInputContainer(inputContainer)

  // // Label
  // let label = document.createElement('strong')
  // label.innerText = 'IP/DNS Addresses:'

  // // Text Area
  // let textarea = document.createElement('textarea')
  // textarea.id = formInputID
  // textarea.style.width = '95%'
  // textarea.style.height = '90%'
  // textarea.style.border = '1px solid black'

  // inputContainer.appendChild(label)
  // inputContainer.appendChild(textarea)

  // Btn Container
  // let btnContainer = document.createElement('div')
  // btnContainer.id = 'ndxHelpBtnContainer'

  // btnContainer.appendChild(createSubmitBtn('passthru', 'add'))
  // btnContainer.appendChild(createSubmitBtn('passthru', 'del'))

  dropdown.appendChild(createCloseBtn());
  dropdown.appendChild(head);
  dropdown.appendChild(createInputContainer('ndxBulkPatthruInputContainer'));
  dropdown.appendChild(createButtonContainer('ndxHelpBtnContainer'));
  return dropdown;
};

// Top-Level Container which will change shape and content depending on the state
const createContainer = id => {
  let container = document.createElement('div');
  container.id = id;
  styleContainer(container);
  return container;
};

// Initiates the container with the top button active. Default state called in main().
const createNDXHelper = id => {
  let helpContainer = createContainer(id),
    ndxBtnTop = createTopBtn(passthruHelpBtnID);
  helpContainer.appendChild(ndxBtnTop);
  return helpContainer;
};

// STYLING

//// Used for "Add" and "Delete" buttons on the dropdown form
const styleButton = function (button) {
  let btnStyle = button.style;
  btnStyle.height = '33px';
  btnStyle.width = '100px';
  btnStyle.display = 'flex';
  btnStyle.flexDirection = 'column';
  btnStyle.alignContent = 'column';
  btnStyle.justifyContent = 'center';
  btnStyle.textAlign = 'center';
  btnStyle.border = '1px solid black';
  btnStyle.background = bgColorDefaultBtn;
  btnStyle.cursor = 'pointer';
  button.addEventListener('mouseover', () => {
    btnStyle.background = btnHoverDefault;
  });
  button.addEventListener('mouseout', () => {
    btnStyle.background = bgColorDefaultBtn;
  });
  return button;
};
const styleCloseButton = function (button) {
  let style = button.style;
  style.height = collapsedSize[1];
  style.width = collapsedSize[1];
  style.display = 'flex';
  style.flexDirection = 'column';
  style.alignContent = 'column';
  style.justifyContent = 'center';
  style.textAlign = 'center';
  style.borderLeft = '1px solid black';
  style.borderBottom = '1px solid black';
  style.background = bgColorDefaultBtn;
  style.cursor = 'pointer';
  style.padding = '0';
  style.color = 'red';
  style.fontWeight = '900';
  style.alignSelf = 'flex-end';
};
const styleContainer = function (container) {
  let style = container.style;
  style.position = 'absolute';
  style.top = '15px';
  style.right = '25px';
  style.height = 'auto';
  style.width = 'auto';
  style.padding = '0';
  style.background = bgColorDefault;
  style.border = '1px solid black';
  style.borderRadius = '3px';
  style.display = 'flex';
  style.flexDirection = 'column';
  style.alignContent = 'center';
  style.justifyContent = 'center';
  style.boxSizing = 'border-box';
};
const styleTopButton = function (button) {
  let style = button.style;
  style.height = collapsedSize[1];
  style.width = collapsedSize[0];
  style.cursor = 'pointer';
  style.display = 'flex';
  style.flexDirection = 'column';
  style.alignContent = 'center';
  style.justifyContent = 'center';
  style.textAlign = 'center';
  style.padding = '2px';
  style.margin = '0';
  style.boxSizing = 'border-box';
};
const styleDropdown = function (dropdown) {
  let style = dropdown.style;
  style.height = expandedSize[1];
  style.width = expandedSize[0];
  style.display = 'flex';
  style.flexDirection = 'column';
  style.alignContent = 'center';
  style.justifyContent = 'space-between';
  style.boxSizing = 'border-box';
  style.alignItems = 'center';
};
const styleInputContainer = function (container) {
  let style = container.style;
  style.width = '90%';
  style.height = '60%';
  style.display = 'flex';
  style.flexDirection = 'column';
  style.alignContent = 'start';
  style.alignItems = 'start';
  style.padding = '0';
  style.margin = '0';
};
const styleButtonContainer = function (btnContainer) {
  let style = btnContainer.style;
  style.width = '95%';
  style.height = '15%';
  style.display = 'flex';
  style.alignContent = 'center';
  style.alignItems = 'center';
  style.justifyContent = 'space-around';
  style.alignSelf = 'center';
  style.padding = '0';
  style.margin = '0';
};

// REQUESTS

const sendRequest = async function (url) {
  let result;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    result = response;
  } catch (error) {
    console.error(error.message);
  }
  return result;
};
const sendPassthroughActionRequest = async function (action, domain, passThroughAddress) {
  let actionType = 0;
  switch (action) {
    case 'add':
      actionType = 1;
      break;
    case 'del':
      actionType = 2;
      break;
    default:
      throw Error('Invalid Action Type. Only use add or del');
  }
  let query = `?WINDWEB_URL=%2Ffs%2Fconfig%2Fhostpass.htm&usg_hostpassthru_on=1&usg_aaa_passthru_ip=${passThroughAddress}&ipPassAction=${actionType}`;
  let url = `https://${domain}/config/hostpass.htm` + query;
  let result = await sendRequest(url);
  return result;
};
const handlePassthroughArray = async function (action, domain, passthroughArray) {
  if (passthroughArray.length < 1) return;
  let address = passthroughArray.shift();
  if (!address) return;
  if (action === 'add') await sendPassthroughActionRequest("add", domain, address);
  if (action === 'del') await sendPassthroughActionRequest('del', domain, address);
  if (passthroughArray.length > 0) {
    await sleep(50);
    await handlePassthroughArray(action, domain, passthroughArray);
  } else console.log('COMPLETE');
};

// UTIL

const sleep = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};
const listToArray = function (list) {
  let arrayItem = '',
    array = [];
  for (let i = 0; i < list.length; i++) {
    if (/\n/g.test(list[i]) || /,/g.test(list[i])) {
      arrayItem = arrayItem.trim();
      if (arrayItem.length > 0) array.push(arrayItem);
      arrayItem = '';
    } else arrayItem += list[i];
  }
  arrayItem = arrayItem.trim();
  if (arrayItem !== '') array.push(arrayItem);
  return array;
};

// MAIN

const main = async function () {
  if (document.location.hash === '#/config/hostpass.htm' && !document.getElementById(ndxHelpContainerID)) {
    document.body.appendChild(createNDXHelper(ndxHelpContainerID));
  }
  if (document.location.hash !== '#/config/hostpass.htm' && document.getElementById(ndxHelpContainerID)) {
    let btn = document.getElementById(ndxHelpContainerID);
    if (btn) btn.parentElement?.removeChild(btn);
  }
  await sleep(1000);
  main();
};
main();