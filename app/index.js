import './index.css';

const { userAgent } = navigator;
let os = null;

if (userAgent.match("Windows NT") || userAgent.match("Win32") || userAgent.match("Win64")) {
  if (userAgent.match("Win64") || userAgent.match("x64;")) {
    os = 'win64';
  } else {
    os = 'win32';
  }
} else if (userAgent.match("MacIntel") || userAgent.match("Macintosh") || userAgent.match("Intel Mac") || userAgent.match("Mac OS X")) {
  os = 'mac';
}

if (os) {
  const id = 'download-' + os;
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('prefered');
  }
}
