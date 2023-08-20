let instrList = [];

function updateSource() {
  const sourceEl = document.getElementById('source');
  //console.log(sourceEl.innerText);
  localStorage.savedCode = sourceEl.innerText;
  const lines = sourceEl.innerText.split('\n');
  const tokens = [];
  for (let line of lines) {
    if (line.indexOf('//') > -1) {
      line = line.substring(0, line.indexOf('//'));
    }
    for (let token of line.split(/\s+/)) {
      //console.log(token);
      token = token.trim();
      if (token.length) {
        tokens.push(token);
      }
    }
  }
  console.log(tokens);

  const treeEl = document.getElementById('tree');
  treeEl.innerHTML = '';
  instrList = [];
  buildSubtree(treeEl, tokens, 0);
}

const words = {
  'PROGRAM{': {
    isContainer: true,
    isNonExec: true,
  },
  'PROC:<{': {
    isContainer: true,
    isNonExec: true,
  },
  'WHILE:<{': {
    isContainer: true,
    isNonExec: true,
  },
  'UNTIL:<{': {
    isContainer: true,
    isNonExec: true,
  },
  'REPEAT:<{': {
    isContainer: true,
    inputs: 1,
    outputs: [],
  },
  '}>DO<{': {
    isContainer: true,
    isClosing: true,
    inputs: 1,
    outputs: [],
  },
  '}>ELSE<{': {
    isContainer: true,
    isClosing: true,
    restoreAfter: true,
    inputs: 0,
    outputs: [],
  },
  'IF:<{': {
    isContainer: true,
    restoreAfter: true,
    inputs: 1,
    outputs: [],
  },
  'IFNOT:<{': {
    isContainer: true,
    restoreAfter: true,
    inputs: 1,
    outputs: [],
  },
  'IFJMP:<{': {
    isContainer: true,
    restoreAfter: true,
    inputs: 1,
    outputs: [],
  },
  '}>': {
    isClosing: true,
    isNonExec: true,
    inputs: 0,
    outputs: [],
  },
  '}END>c': {
    isClosing: true,
    isNonExec: true,
  },
  'DECLPROC': {
    consume: 1,
    isNonExec: true,
  },
  'DECLMETHOD': {
    consume: 1,
    isNonExec: true,
  },
  'PUSHNULL': {
    gas: 18,
    inputs: 0,
    outputs: ['NULL'],
  },
  'DUP': {
    gas: 18,
    inputs: 1,
    outputs: [0, 0],
  },
  '2DUP': {
    gas: 18,
    inputs: 2,
    outputs: [1, 0, 1, 0],
  },
  'DROP': {
    gas: 18,
    inputs: 1,
    outputs: [],
  },
  'DROPX': {
    gas: 26,
    inputs: 1,
    outputs: [],
  },
  'SWAP': {
    gas: 18,
    inputs: 2,
    outputs: [0, 1],
  },
  'SWAP2': {
    gas: 18,
    inputs: 4,
    outputs: [1, 0, 3, 2],
  },
  'ROT': {
    gas: 18,
    inputs: 3,
    outputs: [1, 0, 2],
  },
  '-ROT': {
    gas: 18,
    inputs: 3,
    outputs: [0, 2, 1],
  },
  'ROLL': {
    gas: 26,
    op: (st, ex) => {
      const cnt = parseInt(ex[0]) + 1;
      return st.slice(0, st.length - cnt).concat(st.slice(st.length - cnt + 1), [st[st.length - cnt]]);
    }
  },
  '-ROLL': {
    gas: 26,
    op: (st, ex) => {
      const cnt = parseInt(ex[0]) + 1;
      return st.slice(0, st.length - cnt).concat([st[st.length - 1]], st.slice(st.length - cnt, st.length - 1));
    }
  },
  '2DROP': {
    gas: 18,
    inputs: 2,
    outputs: [],
  },
  'SREFS': {
    inputs: 1,
    outputs: [-1],
  },
  'SAVE': {
    gas: 26,
  },
  'SAMEALTSAVE': {
    gas: 26,
  },
  'CONS': {
    gas: 28,
    inputs: 2,
    outputs: [-1],
  },
  'PAIR': {
    gas: 28,
    inputs: 2,
    outputs: [-1],
  },
  'UNCONS': {
    gas: 28,
    inputs: 1,
    outputs: [-1, -1],
  },
  'ISNULL': {
    gas: 18,
    inputs: 1,
    outputs: st => [`${st[0]}.null?`],
  },
  'NOT': {
    gas: 26,
    inputs: 1,
    outputs: st => [`~${st[0]}`],
  },
  'HASHCU': {
    gas: 26,
    inputs: 1,
    outputs: st => [`${st[0]}.hash`],
  },
  'PUSH': {
    gas: 18,
    inputs: 0,
    depth: ex => parseInt(ex[0].substring(1)) + 1,
    outputs: (st, ex) => [parseInt(ex[0].substring(1))],
  },
  'PUSH2': {
    gas: 26,
    inputs: 0,
    outputs: (st, ex) => [parseInt(ex[0].substring(1)), parseInt(ex[1].substring(1))],
  },
  'PUSH3': {
    gas: 34,
    inputs: 0,
    outputs: (st, ex) => [parseInt(ex[0].substring(1)), parseInt(ex[1].substring(1)), parseInt(ex[2].substring(1))],
  },
  'OVER': {
    gas: 18,
    inputs: 2,
    outputs: [1, 0, 1],
  },
  'EQUAL': {
    gas: 18,
    inputs: 2,
    outputs: st => [`${st[1]}=${st[0]}`],
  },
  'LESS': {
    gas: 18,
    inputs: 2,
    outputs: st => [`${st[1]}<${st[0]}`],
  },
  'LEQ': {
    gas: 18,
    inputs: 2,
    outputs: st => [`${st[1]}<=${st[0]}`],
  },
  'BLKDROP2': {
    gas: 26,
    op: (st, ex) => st.slice(0, st.length - parseInt(ex[0]) - parseInt(ex[1])).concat(st.slice(st.length - parseInt(ex[1]))),
  },
  'CTOS': {
    gas: 118,
    inputs: 1,
    outputs: [-1],
  },
  'SREFS': {
    gas: 26,
    inputs: 1,
    outputs: [-1],
  },
  'LDREF': {
    gas: 18,
    inputs: 1,
    outputs: st => [-1, `${st[0]}'`],
  },
  'NEWC': {
    gas: 18,
    inputs: 0,
    outputs: [-1],
  },
  'ENDC': {
    gas: 518,
    inputs: 1,
    outputs: [-1],
  },
  'PUSHINT': {
    gas: 18,
    inputs: 0,
    outputs: (st, ex) => [ex[0]],
  },
  'RETALT': {
    gas: 26,
  },
  'ZERO': {
    gas: 18,
    inputs: 0,
    outputs: ['0'],
  },
  'ONE': {
    gas: 18,
    inputs: 0,
    outputs: ['1'],
  },
  'NIL': {
    gas: 26,
    inputs: 0,
    outputs: ['()'],
  },
  'INC': {
    gas: 18,
    inputs: 1,
    outputs: st => [`${st[0]}+1`],
  },
  'DEC': {
    gas: 18,
    inputs: 1,
    outputs: st => [`${st[0]}-1`],
  },
  'TUPLEVAR': {
    gas: '26*',
  },
  'XCHG': {
    gas: 26,
    inputs: 0,
    depth: ex => Math.max(parseInt(ex[0].substring(1)), parseInt(ex[1].substring(1))) + 1,
    op: (st, ex) => {
      let i0 = parseInt(ex[0].substring(1));
      let i1 = parseInt(ex[1].substring(1));
      if (i0 > i1) {
        [i0, i1] = [i1, i0];
      }
      return st.slice(0, st.length - i1 - 1).concat([st[st.length - i0 - 1]], st.slice(st.length - i1, st.length - i0 - 1), [st[st.length - i1 - 1]], st.slice(st.length - i0));
    },
  },
  'XCHG2': {
    gas: 26,
    inputs: 0,
    depth: ex => Math.max(parseInt(ex[0].substring(1)), parseInt(ex[1].substring(1))) + 1,
    op: (st, ex) => {
      let i0 = parseInt(ex[0].substring(1));
      st = st.slice(0, st.length - i0 - 1).concat([st[st.length - 2]], st.slice(st.length - i0, st.length - 2), [st[st.length - i0 - 1], st[st.length - 1]]);
      let i1 = parseInt(ex[1].substring(1));
      return st.slice(0, st.length - i1 - 1).concat([st[st.length - 1]], st.slice(st.length - i1, st.length - 1), [st[st.length - i1 - 1]]);
    },
  },
  'PUSHCTR': {
    gas: 26,
    inputs: 0,
    outputs: (st, ex) => [ex[0]],
  },
  'POPCTR': {
    gas: 26,
    inputs: 1,
    outputs: [],
  },
  'INDEXVAR': {
    gas: 26,
    inputs: 2,
    outputs: [-1],
  },
  'TPUSH': {
    gas: '26*',
    inputs: 2,
    outputs: st => [`${st[1]}'`],
  },
  'UBITSIZE': {
    gas: 26,
    inputs: 1,
    outputs: st => [`sz`],
  },
  'POW2': {
    gas: 26,
    inputs: 1,
    outputs: st => [`2^${st[0]}'`],
  },
  'SBITS': {
    gas: 26,
    inputs: 1,
    outputs: [-1],
  },
  'PUSHPOW2DEC': {
    gas: 26,
    inputs: 0,
    outputs: (st, ex) => [isNaN(parseInt(ex[0])) ? -1 : (Math.pow(2, parseInt(ex[0])) - 1).toString()],
  },
  'MIN': {
    gas: 26,
    inputs: 2,
    outputs: [-1],
  },
  'TUCK': {
    gas: 18,
    inputs: 2,
    outputs: [0, 1, 0],
  },
  'LDUX': {
    gas: 26,
    inputs: 2,
    outputs: [-1, -1],
  },
  'TLEN': {
    gas: 26,
    inputs: 1,
    outputs: st => [`${st[0]}.len`],
  },
  'INDEX': {
    gas: 26,
    inputs: 1,
    outputs: (st, ex) => [`${st[0]}[${ex[0]}]`],
  },
  'EQINT': {
    gas: 26,
    inputs: 1,
    outputs: (st, ex) => [`${st[0]}=${ex[0]}`],
  },
  'GTINT': {
    gas: 26,
    inputs: 1,
    outputs: (st, ex) => [`${st[0]}>${ex[0]}`],
  },
  'LESSINT': {
    gas: 26,
    inputs: 1,
    outputs: (st, ex) => [`${st[0]}<${ex[0]}`],
  },
  'ADDCONST': {
    gas: 26,
    inputs: 1,
    outputs: (st, ex) => [`${st[0]}${ex[0] == '-' ? '' : '+'}${ex[0]}`],
  },
  'AND': {
    gas: 18,
    inputs: 2,
    outputs: st => [`${st[1]}&${st[0]}`],
  },
  'OR': {
    gas: 18,
    inputs: 2,
    outputs: st => [`${st[1]}|${st[0]}`],
  },
  'MUL': {
    gas: 18,
    inputs: 2,
    outputs: st => [`${st[1]}*${st[0]}`],
  },
  'ADD': {
    gas: 18,
    inputs: 2,
    outputs: st => [`${st[1]}+${st[0]}`],
  },
  'SUB': {
    gas: 18,
    inputs: 2,
    outputs: st => [`${st[1]}-${st[0]}`],
  },
  'MOD': {
    gas: 26,
    inputs: 2,
    outputs: st => [`${st[1]}%${st[0]}`],
  },
  'LDU': {
    gas: 26,
    inputs: 1,
    outputs: st => [-1, `${st[0]}'`],
  },
  'STU': {
    gas: 26,
    inputs: 2,
    outputs: st => [`${st[0]}'`],
  },
  'STREF': {
    gas: 26,
    inputs: 2,
    outputs: st => [`${st[0]}'`],
  },
  'SEMPTY': {
    gas: 26,
    inputs: 1,
    outputs: st => [`${st[0]}.empty?`],
  },
  'SDEMPTY': {
    gas: 26,
    inputs: 1,
    outputs: st => [`${st[0]}.dempty?`],
  },
  'SREMPTY': {
    gas: 26,
    inputs: 1,
    outputs: st => [`${st[0]}.rempty?`],
  },
  'BLKDROP': {
    gas: 26,
    op: (st, ex) => st.slice(0, st.length - parseInt(ex[0])),
  },
  'XCPU': {
    gas: 26,
    inputs: 0,
    op: (st, ex) => { // s[i] XCHG0 s[j] PUSH
      let i0 = parseInt(ex[0].substring(1));
      st = st.slice(0, st.length - i0 - 1).concat([st[st.length - 1]], st.slice(st.length - i0, st.length - 1), [st[st.length - i0 - 1]]);
      let i1 = parseInt(ex[1].substring(1));
      st.push(st[st.length - i1 - 1]);
      return st;
    }
  },
  'PUXC': {
    gas: 26,
    inputs: 0,
    op: (st, ex) => { // s[i] PUSH SWAP s[j] XCHG0
      let i0 = parseInt(ex[0].substring(1));
      const top = st.pop();
      st.push(st[st.length - i0 - 1]);
      let i1 = parseInt(ex[1].substring(1));
      st = st.slice(0, st.length - i1 - 1).concat([top], st.slice(st.length - i1), [st[st.length - i1 - 1]]);
      return st;
    }
  },
  'NIP': {
    gas: 18,
    inputs: 2,
    outputs: [0],
  },
  'POP': {
    gas: 18,
    depth: ex => parseInt(ex[0]) + 1,
    op: (st, ex) => {
      const top = st.pop();
      const i0 = parseInt(ex[0]);
      st[st.length - i0] = top;
      return st;
    }
  }
}
const colors = [ // Default colors; can be overrided for each series
  '#108BE3', // blue
  '#E8AF14', // yellow
  '#9ED448', // lime
  '#E65850', // red
  '#2373DB', // darker blue
  '#F79E39', // orange
  '#5FB641', // green
  '#FF6E80', // pink
  '#CA6AD5', // purple
  '#8B49D4', // violet
  '#31E0C4', // aqua
  '#00B2CC', // dark aqua
  '#90A7B2', // ligher blue-gray
  '#6C7980', // darker blue-gray
];

function makeItem(stack, name = null) {
  let item = {
    color: stack.nextColor,
    name: (name === null) ? stack.nextLetter : name,
  }
  stack.nextColor = (stack.nextColor + 1) % colors.length;
  if (name === null) {
    stack.nextLetter = String.fromCharCode(stack.nextLetter.charCodeAt(0) + 1);
  }
  return item;
}

function makeStackEl(val) {
  const valueEl = document.createElement('div');
  valueEl.className = 'token__stack-value';
  valueEl.style.backgroundColor = colors[val.color];
  valueEl.innerText = val.name;
  return valueEl;
}

function buildSubtree(parentEl, tokens, i, depth = 0, stack = { nextLetter: 'a', nextColor: 0, values: [] }) {
  let st = i;
  while (i < tokens.length) {
    const token = tokens[i];
    if (token[0] == '\'') {
      i += 1;
      st += 1;
      stack.values.push(makeItem(stack, token.substring(1)));
      continue;
    }
    if (token[0] == '^') {
      i += 1;
      st += 1;
      stack.values.pop();
      if (token.length > 1) {
        stack.values.push(makeItem(stack, token.substring(1)));
      }
      continue;
    }
    let info = words[token];
    if (!info && token[0].toLowerCase() == token[0]) {
      i += 1;
      continue; // skip numbers and other literals
    }

    const el = document.createElement('div');
    parentEl.appendChild(el);
    el.className = 'token';

    const stackEl = document.createElement('span');
    stackEl.className = 'token__stack';
    el.appendChild(stackEl);

    const gasEl = document.createElement('span');
    gasEl.className = 'token__gas';
    el.appendChild(gasEl);

    const padEl = document.createElement('span');
    padEl.style.width = `${depth * 20}px`;
    padEl.className = 'token__pad';
    el.appendChild(padEl);

    let extra = 0;
    if (info) {
      if (info.consume) {
        extra = info.consume;
      }

      if (info.gas) {
        gasEl.innerText = info.gas;
      }

      const extras = tokens.slice(st, i);

      let inputs = (typeof info.inputs == 'function') ? info.inputs(stack.values.map(v => v.name).reverse(), extras) : info.inputs;
      let depth = (typeof info.depth == 'function') ? info.depth(extras) : (info.depth | inputs);

      if (info.outputs) {
        while (stack.values.length < depth) { // prepend new values
          const item = makeItem(stack);
          for (let j = 0; j < instrList.length; j++) {
            if (instrList[j].info && !instrList[j].info.isNonExec) {
              instrList[j].stackEl.insertBefore(makeStackEl(item), instrList[j].stackEl.firstChild);
            }
          }
          stack.values.splice(0, 0, item);
        }
      }
      let outputs = (typeof info.outputs == 'function') ? info.outputs(stack.values.map(v => v.name).reverse(), extras) : info.outputs;

      if (!info.isNonExec) {
        for (let val of stack.values) {
          stackEl.appendChild(makeStackEl(val));
        }
      }

      // update stack
      if (info.op) {
        stack.values = info.op(stack.values, extras);
      } else
      if (outputs) {
        const oldVals = stack.values.slice(0);
        stack.values = stack.values.slice(0, stack.values.length - inputs);
        for (let j = 0; j < outputs.length; j++) {
          const outp = outputs[j];
          if (typeof outp != 'number' || outp < 0) {
            stack.values.push(makeItem(stack, outp == -1 ? null : outp));
          } else {
            stack.values.push(oldVals[oldVals.length - 1 - outp]);
          }
        }
      }
    }

    for (let j = st; j <= i + extra; j++) {
      const mnemEl = document.createElement('span');
      mnemEl.className = 'token__mnem';
      if (j == i) {
        mnemEl.classList.add('is-name');
      } else
      if (tokens[j][0] == 's') {
        mnemEl.classList.add('is-stack-value');
      } else
      if (tokens[j][0] == '-' || (tokens[j][0] >= '0' && tokens[j][0] <= '9')) {
        mnemEl.classList.add('is-number');
      }
      mnemEl.innerText = tokens[j];
      el.appendChild(mnemEl);
    }

    instrList.push({
      i, token, info, el, stackEl, gasEl, padEl,
    });

    if (info && info.isClosing) {
      padEl.style.width = `${(depth - 1) * 20}px`; // unindent last
      return i;
    }

    while (info && info.isContainer) {
      const prev = stack.values.slice(0);
      const contEl = document.createElement('div');
      contEl.className = 'token__subtree';
      el.appendChild(contEl);
      i = buildSubtree(contEl, tokens, i + 1 + extra, depth + 1, stack);
      if (info.restoreAfter) { // for example, IF should restore previous state
        stack.values = prev;
      }
      if (i >= tokens.length) {
        break;
      }
      info = words[tokens[i]];
    }
    i += 1 + extra;
    st = i;
  }
}

if (localStorage.savedCode) {
  document.getElementById('source').innerText = localStorage.savedCode;
}
updateSource();
