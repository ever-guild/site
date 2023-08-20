const raw = `\\nxsubpoint\\emb{Basic stack manipulation primitives}
\\begin{itemize}
\\item {\\tt 00} --- {\\tt NOP}, does nothing.
\\item {\\tt 01} --- {\\tt XCHG s1}, also known as {\\tt SWAP}.
\\item {\\tt 0$i$} --- {\\tt XCHG s$(i)$} or {\\tt XCHG s0,s$(i)$}, interchanges the top of the stack with {\\tt s$(i)$}, $1\\leq i\\leq 15$.
\\item {\\tt 10$ij$} --- {\\tt XCHG s$(i)$,s$(j)$}, $1\\leq i<j\\leq15$, interchanges {\\tt s$(i)$} with {\\tt s$(j)$}.
\\item {\\tt 11$ii$} --- {\\tt XCHG s0,s$(ii)$}, with $0\\leq ii\\leq255$.
\\item {\\tt 1$i$} --- {\\tt XCHG s1,s$(i)$}, $2\\leq i\\leq 15$.
\\item {\\tt 2$i$} --- {\\tt PUSH s$(i)$}, $0\\leq i\\leq 15$, pushes a copy of the old {\\tt s$(i)$} into the stack.
\\item {\\tt 20} --- {\\tt PUSH s0}, also known as {\\tt DUP}.
\\item {\\tt 21} --- {\\tt PUSH s1}, also known as {\\tt OVER}.
\\item {\\tt 3$i$} --- {\\tt POP $s(i)$}, $0\\leq i\\leq 15$, pops the old top-of-stack value into the old {\\tt s$(i)$}.
\\item {\\tt 30} --- {\\tt POP s0}, also known as {\\tt DROP}, discards the top-of-stack value.
\\item {\\tt 31} --- {\\tt POP s1}, also known as {\\tt NIP}.
\\end{itemize}

\\nxsubpoint\\emb{Compound stack manipulation primitives}
Parameters $i$, $j$, and $k$ of the following primitives all are 4-bit integers in the range $0\\ldots15$.
\\begin{itemize}
\\item {\\tt 4$ijk$} --- {\\tt XCHG3 s$(i)$,s$(j)$,s$(k)$}, equivalent to {\\tt XCHG s2,s$(i)$}; {\\tt XCHG s1, s$(j)$}; {\\tt XCHG s0,s$(k)$}, with $0\\leq i,j,k\\leq 15$.
\\item {\\tt 50$ij$} --- {\\tt XCHG2 s$(i)$,s$(j)$}, equivalent to {\\tt XCHG s1,s$(i)$}; {\\tt XCHG s$(j)$}.
\\item {\\tt 51$ij$} --- {\\tt XCPU s$(i)$,s$(j)$}, equivalent to {\\tt XCHG s$(i)$}; {\\tt PUSH s$(j)$}.
\\item {\\tt 52$ij$} --- {\\tt PUXC s$(i)$,s$(j-1)$}, equivalent to {\\tt PUSH s$(i)$}; {\\tt SWAP}; {\\tt XCHG s$(j)$}.
\\item {\\tt 53$ij$} --- {\\tt PUSH2 s$(i)$,s$(j)$}, equivalent to {\\tt PUSH s$(i)$}; {\\tt PUSH s$(j+1)$}.
\\item {\\tt 540$ijk$} --- {\\tt XCHG3 s$(i)$,s$(j)$,s$(k)$} (long form).
\\item {\\tt 541$ijk$} --- {\\tt XC2PU s$(i)$,s$(j)$,s$(k)$}, equivalent to {\\tt XCHG2 s$(i)$,s$(j)$}; {\\tt PUSH s$(k)$}.
\\item {\\tt 542$ijk$} --- {\\tt XCPUXC s$(i)$,s$(j)$,s$(k-1)$}, equivalent to {\\tt XCHG s1,s$(i)$}; {\\tt PUXC s$(j)$,s$(k-1)$}.
\\item {\\tt 543$ijk$} --- {\\tt XCPU2 s$(i)$,s$(j)$,s$(k)$}, equivalent to {\\tt XCHG s$(i)$}; {\\tt PUSH2 s$(j)$, s$(k)$}.
\\item {\\tt 544$ijk$} --- {\\tt PUXC2 s$(i)$,s$(j-1)$,s$(k-1)$}, equivalent to {\\tt PUSH s$(i)$}; {\\tt XCHG s2}; {\\tt XCHG2 s$(j)$,s$(k)$}.
\\item {\\tt 545$ijk$} --- {\\tt PUXCPU s$(i)$,s$(j-1)$,s$(k-1)$}, equivalent to {\\tt PUXC s$(i)$,s$(j-1)$}; {\\tt PUSH s$(k)$}.
\\item {\\tt 546$ijk$} --- {\\tt PU2XC s$(i)$,s$(j-1)$,s$(k-2)$}, equivalent to {\\tt PUSH s$(i)$}; {\\tt SWAP;} {\\tt PUXC s$(j)$,s$(k-1)$}.
\\item {\\tt 547$ijk$} --- {\\tt PUSH3 s$(i)$,s$(j)$,s$(k)$}, equivalent to {\\tt PUSH s$(i)$}; {\\tt PUSH2 s$(j+1)$,s$(k+1)$}.
\\item {\\tt 54C\\_} --- unused.
\\end{itemize}

\\nxsubpoint\\emb{Exotic stack manipulation primitives}
\\begin{itemize}
\\item {\\tt 55$ij$} --- {\\tt BLKSWAP $i+1$,$j+1$}, permutes two blocks {\\tt s$(j+i+1)$}\\dots{\\tt s$(j+1)$} and {\\tt s$(j)$}\\dots{\\tt s0}, for $0\\leq i,j\\leq15$. Equivalent to {\\tt REVERSE $i+1$,$j+1$}; {\\tt REVERSE $j+1$,0}; {\\tt REVERSE $i+j+2$,0}.
\\item {\\tt 5513} --- {\\tt ROT2} or {\\tt 2ROT} ($a$ $b$ $c$ $d$ $e$ $f$ -- $c$ $d$ $e$ $f$ $a$ $b$), rotates the three topmost pairs of stack entries.
\\item {\\tt 550$i$} --- {\\tt ROLL $i+1$}, rotates the top $i+1$ stack entries. Equivalent to {\\tt BLKSWAP 1,$i+1$}.
\\item {\\tt 55$i$0} --- {\\tt ROLLREV $i+1$} or {\\tt -ROLL $i+1$}, rotates the top $i+1$ stack entries in the other direction. Equivalent to {\\tt BLKSWAP $i+1$,1}.
\\item {\\tt 56$ii$} --- {\\tt PUSH s$(ii)$} for $0\\leq ii\\leq 255$.
\\item {\\tt 57$ii$} --- {\\tt POP s$(ii)$} for $0\\leq ii\\leq 255$.
\\item {\\tt 58} --- {\\tt ROT} ($a$ $b$ $c$ -- $b$ $c$ $a$), equivalent to {\\tt BLKSWAP 1,2} or to {\\tt XCHG2 s2,s1}.
\\item {\\tt 59} --- {\\tt ROTREV} or {\\tt -ROT} ($a$ $b$ $c$ -- $c$ $a$ $b$), equivalent to {\\tt BLKSWAP 2,1} or to {\\tt XCHG2 s2,s2}.
\\item {\\tt 5A} --- {\\tt SWAP2} or {\\tt 2SWAP} ($a$ $b$ $c$ $d$ -- $c$ $d$ $a$ $b$), equivalent to {\\tt BLKSWAP 2,2} or to {\\tt XCHG2 s3,s2}.
\\item {\\tt 5B} --- {\\tt DROP2} or {\\tt 2DROP} ($a$ $b$ -- ), equivalent to {\\tt DROP}; {\\tt DROP}.
\\item {\\tt 5C} --- {\\tt DUP2} or {\\tt 2DUP} ($a$ $b$ -- $a$ $b$ $a$ $b$), equivalent to {\\tt PUSH2 s1,s0}.
\\item {\\tt 5D} --- {\\tt OVER2} or {\\tt 2OVER} ($a$ $b$ $c$ $d$ -- $a$ $b$ $c$ $d$ $a$ $b$), equivalent to {\\tt PUSH2 s3,s2}.
\\item {\\tt 5E$ij$} --- {\\tt REVERSE $i+2$,$j$}, reverses the order of {\\tt s$(j+i+1)$}\\dots{\\tt s$(j)$} for $0\\leq i,j\\leq 15$; equivalent to a sequence of $\\lfloor i/2\\rfloor+1$ {\\tt XCHG}s.
\\item {\\tt 5F0$i$} --- {\\tt BLKDROP $i$}, equivalent to {\\tt DROP} performed $i$ times.
\\item {\\tt 5F$ij$} --- {\\tt BLKPUSH $i$,$j$}, equivalent to {\\tt PUSH s$(j)$} performed $i$ times, $1\\leq i\\leq 15$, $0\\leq j\\leq 15$.
\\item {\\tt 60} --- {\\tt PICK} or {\\tt PUSHX}, pops integer $i$ from the stack, then performs {\\tt PUSH s$(i)$}.
\\item {\\tt 61} --- {\\tt ROLLX}, pops integer $i$ from the stack, then performs {\\tt BLKSWAP 1,$i$}.
\\item {\\tt 62} --- {\\tt -ROLLX} or {\\tt ROLLREVX}, pops integer $i$ from the stack, then performs {\\tt BLKSWAP $i$,1}.
\\item {\\tt 63} --- {\\tt BLKSWX}, pops integers $i$,$j$ from the stack, then performs {\\tt BLKSWAP $i$,$j$}.
\\item {\\tt 64} --- {\\tt REVX}, pops integers $i$,$j$ from the stack, then performs {\\tt REVERSE $i$,$j$}.
\\item {\\tt 65} --- {\\tt DROPX}, pops integer $i$ from the stack, then performs {\\tt BLKDROP $i$}.
\\item {\\tt 66} --- {\\tt TUCK} ($a b - b a b$), equivalent to {\\tt SWAP}; {\\tt OVER} or to {\\tt XCPU s1,s1}.
\\item {\\tt 67} --- {\\tt XCHGX}, pops integer $i$ from the stack, then performs {\\tt XCHG s$(i)$}.
\\item {\\tt 68} --- {\\tt DEPTH}, pushes the current depth of the stack.
\\item {\\tt 69} --- {\\tt CHKDEPTH}, pops integer $i$ from the stack, then checks whether there are at least $i$ elements, generating a stack underflow exception otherwise.
\\item {\\tt 6A} --- {\\tt ONLYTOPX}, pops integer $i$ from the stack, then removes all but the top $i$ elements.
\\item {\\tt 6B} --- {\\tt ONLYX}, pops integer $i$ from the stack, then leaves only the bottom $i$ elements. Approximately equivalent to {\\tt DEPTH}; {\\tt SWAP}; {\\tt SUB}; {\\tt DROPX}.
\\item {\\tt 6C} --- reserved for stack operations.
\\end{itemize}

\\mysubsection{Tuple, List, and Null primitives}

{\\em Tuple\\/}s are ordered collections consisting of at most 255 TVM stack values of arbitrary types (not necessarily the same). Tuple primitives create, modify, and unpack {\\em Tuple\\/}s; they manipulate values of arbitrary types in the process, similarly to the stack primitives. We do not recommend using {\\em Tuple\\/}s of more than 15 elements.

When a {\\em Tuple\\/} $t$ contains elements $x_1$, \\ldots, $x_n$ (in that order), we write $t=(x_1,\\ldots,x_n)$; number $n\\geq0$ is the {\\em length\\/} of {\\em Tuple\\/}~$t$. It is also denoted by $|t|$. {\\em Tuple\\/}s of length two are called {\\em pairs}, and {\\em Tuple\\/}s of length three are {\\em triples}.

Lisp-style lists are represented with the aid of pairs, i.e., tuples consisting of exactly two elements. An empty list is represented by a {\\em Null\\/} value, and a non-empty list is represented by pair $(h,t)$, where $h$ is the first element of the list, and $t$ is its tail. 

\\nxsubpoint\\emb{{\\em Null\\/} primitives}\\label{sp:null.ops}
The following primitives work with (the only) value~$\\bot$ of type {\\em Null}, useful for representing empty lists, empty branches of binary trees, and absence of values in {\\em Maybe $X$} types. An empty {\\em Tuple\\/} created by {\\tt NIL} could have been used for the same purpose; however, {\\em Null\\/} is more efficient and costs less gas. 
\\begin{itemize}
\\item {\\tt 6D} --- {\\tt NULL} or {\\tt PUSHNULL} ( -- $\\bot$), pushes the only value of type {\\em Null}.
\\item {\\tt 6E} --- {\\tt ISNULL} ($x$ -- $?$), checks whether $x$ is a {\\em Null}, and returns $-1$ or $0$ accordingly.
\\end{itemize}

\\nxsubpoint\\emb{Tuple primitives}\\label{sp:prim.tuple}
\\begin{itemize}
\\item {\\tt 6F0$n$} --- {\\tt TUPLE $n$} ($x_1$ \\dots $x_n$ -- $t$), creates a new {\\em Tuple\\/}~$t=(x_1,\\ldots,x_n)$ containing $n$ values $x_1$, \\dots, $x_n$, where $0\\leq n\\leq 15$.
\\item {\\tt 6F00} --- {\\tt NIL} ( -- $t$), pushes the only {\\em Tuple\\/}~$t=()$ of length zero.
\\item {\\tt 6F01} --- {\\tt SINGLE} ($x$ -- $t$), creates a singleton $t:=(x)$, i.e., a {\\em Tuple\\/} of length one.
\\item {\\tt 6F02} --- {\\tt PAIR} or {\\tt CONS} ($x$ $y$ -- $t$), creates pair $t:=(x,y)$.
\\item {\\tt 6F03} --- {\\tt TRIPLE} ($x$ $y$ $z$ -- $t$), creates triple $t:=(x,y,z)$.
\\item {\\tt 6F1$k$} --- {\\tt INDEX $k$} ($t$ -- $x$), returns the $k$-th element of a {\\em Tuple\\/}~$t$, where $0\\leq k\\leq 15$. In other words, returns $x_{k+1}$ if $t=(x_1,\\ldots,x_n)$. If $k\\geq n$, throws a range check exception.
\\item {\\tt 6F10} --- {\\tt FIRST} or {\\tt CAR} ($t$ -- $x$), returns the first element of a {\\em Tuple}.
\\item {\\tt 6F11} --- {\\tt SECOND} or {\\tt CDR} ($t$ -- $y$), returns the second element of a {\\em Tuple}.
\\item {\\tt 6F12} --- {\\tt THIRD} ($t$ -- $z$), returns the third element of a {\\em Tuple}.
\\item {\\tt 6F2$n$} --- {\\tt UNTUPLE $n$} ($t$ -- $x_1$ \\dots $x_n$), unpacks a {\\em Tuple\\/}~$t=(x_1,\\ldots,x_n)$ of length equal to $0\\leq n\\leq 15$. If $t$ is not a {\\em Tuple}, of if $|t|\\neq n$, a type check exception is thrown.
\\item {\\tt 6F21} --- {\\tt UNSINGLE} ($t$ -- $x$), unpacks a singleton $t=(x)$.
\\item {\\tt 6F22} --- {\\tt UNPAIR} or {\\tt UNCONS} ($t$ -- $x$ $y$), unpacks a pair $t=(x,y)$.
\\item {\\tt 6F23} --- {\\tt UNTRIPLE} ($t$ -- $x$ $y$ $z$), unpacks a triple $t=(x,y,z)$.
\\item {\\tt 6F3$k$} --- {\\tt UNPACKFIRST $k$} ($t$ -- $x_1$ \\dots $x_k$), unpacks first $0\\leq k\\leq 15$ elements of a {\\em Tuple\\/}~$t$. If $|t|<k$, throws a type check exception.
\\item {\\tt 6F30} --- {\\tt CHKTUPLE} ($t$ -- ), checks whether $t$ is a {\\em Tuple}.
\\item {\\tt 6F4$n$} --- {\\tt EXPLODE $n$} ($t$ -- $x_1$ \\dots $x_m$ $m$), unpacks a {\\em Tuple\\/}~$t=(x_1,\\ldots,x_m)$ and returns its length $m$, but only if $m\\leq n\\leq 15$. Otherwise throws a type check exception.
\\item {\\tt 6F5$k$} --- {\\tt SETINDEX $k$} ($t$ $x$ -- $t'$), computes {\\em Tuple\\/}~$t'$ that differs from $t$ only at position $t'_{k+1}$, which is set to~$x$. In other words, $|t'|=|t|$, $t'_i=t_i$ for $i\\neq k+1$, and $t'_{k+1}=x$, for given $0\\leq k\\leq15$. If $k\\geq|t|$, throws a range check exception.
\\item {\\tt 6F50} --- {\\tt SETFIRST} ($t$ $x$ -- $t'$), sets the first component of {\\em Tuple\\/}~$t$ to $x$ and returns the resulting {\\em Tuple\\/}~$t'$.
\\item {\\tt 6F51} --- {\\tt SETSECOND} ($t$ $x$ -- $t'$), sets the second component of {\\em Tuple\\/}~$t$ to $x$ and returns the resulting {\\em Tuple\\/}~$t'$.
\\item {\\tt 6F52} --- {\\tt SETTHIRD} ($t$ $x$ -- $t'$), sets the third component of {\\em Tuple\\/}~$t$ to $x$ and returns the resulting {\\em Tuple\\/}~$t'$.
\\item {\\tt 6F6$k$} --- {\\tt INDEXQ $k$} ($t$ -- $x$), returns the $k$-th element of a {\\em Tuple\\/}~$t$, where $0\\leq k\\leq 15$. In other words, returns $x_{k+1}$ if $t=(x_1,\\ldots,x_n)$. If $k\\geq n$, or if $t$ is {\\em Null}, returns a {\\em Null\\/} instead of~$x$.
\\item {\\tt 6F7$k$} --- {\\tt SETINDEXQ $k$} ($t$ $x$ -- $t'$), sets the $k$-th component of {\\em Tuple\\/}~$t$ to $x$, where $0\\leq k<16$, and returns the resulting {\\em Tuple\\/}~$t'$. If $|t|\\leq k$, first extends the original {\\em Tuple\\/} to length $k+1$ by setting all new components to {\\em Null}. If the original value of $t$ is {\\em Null}, treats it as an empty {\\em Tuple}. If $t$ is not {\\em Null\\/} or {\\em Tuple}, throws an exception. If $x$ is {\\em Null\\/} and either $|t|\\leq k$ or $t$ is {\\em Null}, then always returns $t'=t$ (and does not consume tuple creation gas).
\\item {\\tt 6F80} --- {\\tt TUPLEVAR} ($x_1$ \\dots $x_n$ $n$ -- $t$), creates a new {\\em Tuple\\/}~$t$ of length~$n$ similarly to {\\tt TUPLE}, but with $0\\leq n\\leq 255$ taken from the stack.
\\item {\\tt 6F81} --- {\\tt INDEXVAR} ($t$ $k$ -- $x$), similar to {\\tt INDEX $k$}, but with $0\\leq k\\leq 254$ taken from the stack.
\\item {\\tt 6F82} --- {\\tt UNTUPLEVAR} ($t$ $n$ -- $x_1$ \\dots $x_n$), similar to {\\tt UNTUPLE $n$}, but with $0\\leq n\\leq 255$ taken from the stack.
\\item {\\tt 6F83} --- {\\tt UNPACKFIRSTVAR} ($t$ $n$ -- $x_1$ \\dots $x_n$), similar to {\\tt UNPACKFIRST $n$}, but with $0\\leq n\\leq 255$ taken from the stack.
\\item {\\tt 6F84} --- {\\tt EXPLODEVAR} ($t$ $n$ -- $x_1$ \\dots $x_m$ $m$), similar to {\\tt EXPLODE $n$}, but with $0\\leq n\\leq 255$ taken from the stack.
\\item {\\tt 6F85} --- {\\tt SETINDEXVAR} ($t$ $x$ $k$ -- $t'$), similar to {\\tt SETINDEX $k$}, but with $0\\leq k\\leq 254$ taken from the stack.
\\item {\\tt 6F86} --- {\\tt INDEXVARQ} ($t$ $k$ -- $x$), similar to {\\tt INDEXQ $n$}, but with $0\\leq k\\leq 254$ taken from the stack.
\\item {\\tt 6F87} --- {\\tt SETINDEXVARQ} ($t$ $x$ $k$ -- $t'$), similar to {\\tt SETINDEXQ $k$}, but with $0\\leq k\\leq 254$ taken from the stack.
\\item {\\tt 6F88} --- {\\tt TLEN} ($t$ -- $n$), returns the length of a {\\em Tuple}.
\\item {\\tt 6F89} --- {\\tt QTLEN} ($t$ -- $n$ or $-1$), similar to {\\tt TLEN}, but returns $-1$ if $t$ is not a {\\em Tuple}.
\\item {\\tt 6F8A} --- {\\tt ISTUPLE} ($t$ -- $?$), returns $-1$ or $0$ depending on whether $t$ is a {\\em Tuple}.
\\item {\\tt 6F8B} --- {\\tt LAST} ($t$ -- $x$), returns the last element $t_{|t|}$ of a non-empty {\\em Tuple\\/}~$t$.
\\item {\\tt 6F8C} --- {\\tt TPUSH} or {\\tt COMMA} ($t$ $x$ -- $t'$), appends a value~$x$ to a {\\em Tuple\\/} $t=(x_1,\\ldots,x_n)$, but only if the resulting {\\em Tuple\\/} $t'=(x_1,\\ldots,x_n,x)$ is of length at most 255. Otherwise throws a type check exception.
\\item {\\tt 6F8D} --- {\\tt TPOP} ($t$ -- $t'$ $x$), detaches the last element $x=x_n$ from a non-empty {\\em Tuple\\/}~$t=(x_1,\\ldots,x_n)$, and returns both the resulting {\\em Tuple\\/}~$t'=(x_1,\\ldots,x_{n-1})$ and the original last element~$x$.
\\item {\\tt 6FA0} --- {\\tt NULLSWAPIF} ($x$ -- $x$ or $\\bot$ $x$), pushes a {\\em Null\\/} under the topmost {\\em Integer\\/}~$x$, but only if $x\\neq0$.
\\item {\\tt 6FA1} --- {\\tt NULLSWAPIFNOT} ($x$ -- $x$ or $\\bot$ $x$), pushes a {\\em Null\\/} under the topmost {\\em Integer\\/}~$x$, but only if $x=0$. May be used for stack alignment after quiet primitives such as {\\tt PLDUXQ}.
\\item {\\tt 6FA2} --- {\\tt NULLROTRIF} ($x$ $y$ -- $x$ $y$ or $\\bot$ $x$ $y$), pushes a {\\em Null\\/} under the second stack entry from the top, but only if the topmost {\\em Integer\\/} $y$ is non-zero.
\\item {\\tt 6FA3} --- {\\tt NULLROTRIFNOT} ($x$ $y$ -- $x$ $y$ or $\\bot$ $x$ $y$), pushes a {\\em Null\\/} under the second stack entry from the top, but only if the topmost {\\em Integer\\/} $y$ is zero. May be used for stack alignment after quiet primitives such as {\\tt LDUXQ}.
\\item {\\tt 6FB$ij$} --- {\\tt INDEX2 $i$,$j$} ($t$ -- $x$), recovers $x=(t_{i+1})_{j+1}$ for $0\\leq i,j\\leq 3$. Equivalent to {\\tt INDEX $i$}; {\\tt INDEX $j$}.
\\item {\\tt 6FB4} --- {\\tt CADR} ($t$ -- $x$), recovers $x=(t_2)_1$.
\\item {\\tt 6FB5} --- {\\tt CDDR} ($t$ -- $x$), recovers $x=(t_2)_2$.
\\item {\\tt 6FE\\_$ijk$} --- {\\tt INDEX3 $i$,$j$,$k$} ($t$ -- $x$), recovers $x=\\bigl((t_{i+1})_{j+1}\\bigr)_{k+1}$ for $0\\leq i,j,k\\leq3$. Equivalent to {\\tt INDEX2 $i$,$j$}; {\\tt INDEX $k$}.
\\item {\\tt 6FD4} --- {\\tt CADDR} ($t$ -- $x$), recovers $x=\\bigl((t_2)_2\\bigr)_1$.
\\item {\\tt 6FD5} --- {\\tt CDDDR} ($t$ -- $x$), recovers $x=\\bigl((t_2)_2\\bigr)_2$.
\\end{itemize}

\\mysubsection{Constant, or literal primitives}

The following primitives push into the stack one literal (or unnamed constant) of some type and range, stored as a part (an immediate argument) of the instruction. Therefore, if the immediate argument is absent or too short, an \`\`invalid or too short opcode'' exception (code $6$) is thrown.

\\nxsubpoint\\emb{Integer and boolean constants}
\\begin{itemize}
\\item {\\tt 7$i$} --- {\\tt PUSHINT $x$} with $-5\\leq x\\leq 10$, pushes integer $x$ into the stack; here $i$ equals four lower-order bits of $x$ (i.e., $i=x\\bmod 16$).
\\item {\\tt 70} --- {\\tt ZERO}, {\\tt FALSE}, or {\\tt PUSHINT 0}, pushes a zero.
\\item {\\tt 71} --- {\\tt ONE} or {\\tt PUSHINT 1}.
\\item {\\tt 72} --- {\\tt TWO} or {\\tt PUSHINT 2}.
\\item {\\tt 7A} --- {\\tt TEN} or {\\tt PUSHINT} 10.
\\item {\\tt 7F} --- {\\tt TRUE} or {\\tt PUSHINT -1}.
\\item {\\tt 80$xx$} --- {\\tt PUSHINT $xx$} with $-128\\leq xx\\leq127$.
\\item {\\tt 81$xxxx$} --- {\\tt PUSHINT $xxxx$} with $-2^{15}\\leq xxxx<2^{15}$ a signed 16-bit big-endian integer.
\\item {\\tt 81FC18} --- {\\tt PUSHINT $-1000$}.
\\item {\\tt 82$lxxx$} --- {\\tt PUSHINT $xxx$}, where 5-bit $0\\leq l\\leq30$ determines the length $n=8l+19$ of signed big-endian integer $xxx$. The total length of this instruction is $l+4$ bytes or $n+13=8l+32$ bits.
\\item {\\tt 821005F5E100} --- {\\tt PUSHINT $10^8$}.
\\item {\\tt 83$xx$} --- {\\tt PUSHPOW2 $xx+1$}, (quietly) pushes $2^{xx+1}$ for $0\\leq xx\\leq255$.
\\item {\\tt 83FF} --- {\\tt PUSHNAN}, pushes a {\\tt NaN}.
\\item {\\tt 84$xx$} --- {\\tt PUSHPOW2DEC $xx+1$}, pushes $2^{xx+1}-1$ for $0\\leq xx\\leq 255$.
\\item {\\tt 85$xx$} --- {\\tt PUSHNEGPOW2 $xx+1$}, pushes $-2^{xx+1}$ for $0\\leq xx\\leq 255$.
\\item {\\tt 86}, {\\tt 87} --- reserved for integer constants.
\\end{itemize}

\\nxsubpoint\\emb{Constant slices, continuations, cells, and references}
Most of the instructions listed below push literal slices, continuations, cells, and cell references, stored as immediate arguments to the instruction. Therefore, if the immediate argument is absent or too short, an \`\`invalid or too short opcode'' exception (code $6$) is thrown.
\\begin{itemize}
\\item {\\tt 88} --- {\\tt PUSHREF}, pushes the first reference of {\\tt cc.code} into the stack as a {\\em Cell} (and removes this reference from the current continuation).
\\item {\\tt 89} --- {\\tt PUSHREFSLICE}, similar to {\\tt PUSHREF}, but converts the cell into a {\\em Slice}.
\\item {\\tt 8A} --- {\\tt PUSHREFCONT}, similar to {\\tt PUSHREFSLICE}, but makes a simple ordinary {\\em Continuation\\/} out of the cell.
\\item {\\tt 8Bxsss} --- {\\tt PUSHSLICE sss}, pushes the (prefix) subslice of {\\tt cc.code} consisting of its first $8x+4$ bits and no references (i.e., essentially a bitstring), where $0\\leq x\\leq15$. A completion tag is assumed, meaning that all trailing zeroes and the last binary one (if present) are removed from this bitstring. If the original bitstring consists only of zeroes, an empty slice will be pushed.
\\item {\\tt 8B08} --- {\\tt PUSHSLICE x8\\_}, pushes an empty slice (bitstring {\\tt \`'}).
\\item {\\tt 8B04} --- {\\tt PUSHSLICE x4\\_}, pushes bitstring {\\tt \`0'}.
\\item {\\tt 8B0C} --- {\\tt PUSHSLICE xC\\_}, pushes bitstring {\\tt \`1'}.
\\item {\\tt 8Crxxssss} --- {\\tt PUSHSLICE ssss}, pushes the (prefix) subslice of {\\tt cc.code} consisting of its first $1\\leq r+1\\leq 4$ references and up to first $8xx+1$ bits of data, with $0\\leq xx\\leq 31$. A completion tag is also assumed.
\\item {\\tt 8C01} is equivalent to {\\tt PUSHREFSLICE}.
\\item {\\tt 8Drxxsssss} --- {\\tt PUSHSLICE sssss}, pushes the subslice of {\\tt cc.code} consisting of $0\\leq r\\leq 4$ references and up to $8xx+6$ bits of data, with $0\\leq xx\\leq 127$. A completion tag is assumed.
\\item {\\tt 8DE\\_} --- unused (reserved).
\\item {\\tt 8F\\_rxxcccc} --- {\\tt PUSHCONT cccc}, where $cccc$ is the simple ordinary continuation made from the first $0\\leq r\\leq 3$ references and the first $0\\leq xx\\leq 127$ bytes of {\\tt cc.code}.
\\item {\\tt 9xccc} --- {\\tt PUSHCONT ccc}, pushes an $x$-byte continuation for $0\\leq x\\leq 15$.
\\end{itemize}

\\mysubsection{Arithmetic primitives}

\\nxsubpoint\\emb{Addition, subtraction, multiplication}
\\begin{itemize}
\\item {\\tt A0} --- {\\tt ADD} ($x$ $y$ -- $x+y$), adds together two integers.
\\item {\\tt A1} --- {\\tt SUB} ($x$ $y$ -- $x-y$).
\\item {\\tt A2} --- {\\tt SUBR} ($x$ $y$ -- $y-x$), equivalent to {\\tt SWAP}; {\\tt SUB}.
\\item {\\tt A3} --- {\\tt NEGATE} ($x$ -- $-x$), equivalent to {\\tt MULCONST $-1$} or to {\\tt ZERO; SUBR}. Notice that it triggers an integer overflow exception if $x=-2^{256}$.
\\item {\\tt A4} --- {\\tt INC} ($x$ -- $x+1$), equivalent to {\\tt ADDCONST 1}.
\\item {\\tt A5} --- {\\tt DEC} ($x$ -- $x-1$), equivalent to {\\tt ADDCONST $-1$}.
\\item {\\tt A6$cc$} --- {\\tt ADDCONST $cc$} ($x$ -- $x+cc$), $-128\\leq cc\\leq127$.
\\item {\\tt A7$cc$} --- {\\tt MULCONST $cc$} ($x$ -- $x\\cdot cc$), $-128\\leq cc\\leq127$.
\\item {\\tt A8} --- {\\tt MUL} ($x$ $y$ -- $xy$).
\\end{itemize}

\\nxsubpoint\\emb{Division}

The general encoding of a {\\tt DIV}, {\\tt DIVMOD}, or {\\tt MOD} operation is {\\tt A9$mscdf$}, with an optional pre-multiplication and an optional replacement of the division or multiplication by a shift. Variable one- or two-bit fields $m$, $s$, $c$, $d$, and $f$ are as follows:
\\begin{itemize}
\\item $0\\leq m\\leq1$ --- Indicates whether there is pre-multiplication ({\\tt MULDIV} operation and its variants), possibly replaced by a left shift.
\\item $0\\leq s\\leq2$ --- Indicates whether either the multiplication or the division have been replaced by shifts: $s=0$---no replacement, $s=1$---division replaced by a right shift, $s=2$---multiplication replaced by a left shift (possible only for $m=1$).
\\item $0\\leq c\\leq1$ --- Indicates whether there is a constant one-byte argument $tt$ for the shift operator (if $s\\neq0$). For $s=0$, $c=0$. If $c=1$, then $0\\leq tt\\leq 255$, and the shift is performed by $tt+1$ bits.
\\item $1\\leq d\\leq3$ --- Indicates which results of division are required: $1$---only the quotient, $2$---only the remainder, $3$---both.
\\item $0\\leq f\\leq2$ --- Rounding mode: $0$---floor, $1$---nearest integer, $2$---ceiling (cf.~\\ptref{sp:div.round}).
\\end{itemize}

Examples:
\\begin{itemize}
\\item {\\tt A904} --- {\\tt DIV} ($x$ $y$ -- $q:=\\lfloor x/y\\rfloor$).
\\item {\\tt A905} --- {\\tt DIVR} ($x$ $y$ -- $q':=\\lfloor x/y+1/2\\rfloor$).
\\item {\\tt A906} --- {\\tt DIVC} ($x$ $y$ -- $q'':=\\lceil x/y\\rceil$).
\\item {\\tt A908} --- {\\tt MOD} ($x$ $y$ -- $r$), where $q:=\\lfloor x/y\\rfloor$, $r:=x\\bmod y:=x-yq$.
\\item {\\tt A90C} --- {\\tt DIVMOD} ($x$ $y$ -- $q$ $r$), where $q:=\\lfloor x/y\\rfloor$, $r:=x-yq$.
\\item {\\tt A90D} --- {\\tt DIVMODR} ($x$ $y$ -- $q'$ $r'$), where $q':=\\lfloor x/y+1/2\\rfloor$, $r':=x-yq'$.
\\item {\\tt A90E} --- {\\tt DIVMODC} ($x$ $y$ -- $q''$ $r''$), where $q'':=\\lceil x/y\\rceil$, $r'':=x-yq''$.
\\item {\\tt A924} --- same as {\\tt RSHIFT}: ($x$ $y$ -- $\\lfloor x\\cdot 2^{-y}\\rfloor$) for $0\\leq y\\leq 256$.
\\item {\\tt A934$tt$} --- same as {\\tt RSHIFT $tt+1$}: ($x$ -- $\\lfloor x\\cdot 2^{-tt-1}\\rfloor$).
\\item {\\tt A938$tt$} --- {\\tt MODPOW2 $tt+1$}: ($x$ -- $x\\bmod 2^{tt+1}$).
\\item {\\tt A985} --- {\\tt MULDIVR} ($x$ $y$ $z$ -- $q'$), where $q'=\\lfloor xy/z+1/2\\rfloor$.
\\item {\\tt A98C} --- {\\tt MULDIVMOD} ($x$ $y$ $z$ -- $q$ $r$), where $q:=\\lfloor x\\cdot y/z\\rfloor$, $r:=x\\cdot y\\bmod z$ (same as {\\tt */MOD} in Forth).
\\end{itemize}

The most useful of these operations are {\\tt DIV}, {\\tt DIVMOD}, {\\tt MOD}, {\\tt DIVR}, {\\tt DIVC}, {\\tt MODPOW2 $t$}, and {\\tt RSHIFTR $t$} (for integer arithmetic); and {\\tt MULDIVMOD}, {\\tt MULDIV}, {\\tt MULDIVR}, {\\tt LSHIFTDIVR $t$}, and {\\tt MULRSHIFTR $t$} (for fixed-point arithmetic).

\\nxsubpoint\\emb{Shifts, logical operations}
\\begin{itemize}
\\item {\\tt AA$cc$} --- {\\tt LSHIFT $cc+1$} ($x$ -- $x\\cdot2^{cc+1}$), $0\\leq cc\\leq255$.
\\item {\\tt AA00} --- {\\tt LSHIFT 1}, equivalent to {\\tt MULCONST 2} or to Forth's {\\tt 2*}.
\\item {\\tt AB$cc$} --- {\\tt RSHIFT $cc+1$} ($x$ -- $\\lfloor x\\cdot2^{-cc-1}\\rfloor$), $0\\leq cc\\leq255$.
\\item {\\tt AC} --- {\\tt LSHIFT} ($x$ $y$ -- $x\\cdot 2^y$), $0\\leq y\\leq 1023$.
\\item {\\tt AD} --- {\\tt RSHIFT} ($x$ $y$ -- $\\lfloor x\\cdot 2^{-y}\\rfloor$), $0\\leq y\\leq 1023$.
\\item {\\tt AE} --- {\\tt POW2} ($y$ -- $2^y$), $0\\leq y\\leq1023$, equivalent to {\\tt ONE}; {\\tt SWAP}; {\\tt LSHIFT}.
\\item {\\tt AF} --- reserved.
\\item {\\tt B0} --- {\\tt AND} ($x$ $y$ -- $x\\&y$), bitwise \`\`and'' of two signed integers $x$ and $y$, sign-extended to infinity.
\\item {\\tt B1} --- {\\tt OR} ($x$ $y$ -- $x\\vee y$), bitwise \`\`or'' of two integers.
\\item {\\tt B2} --- {\\tt XOR} ($x$ $y$ -- $x\\oplus y$), bitwise \`\`xor'' of two integers.
\\item {\\tt B3} --- {\\tt NOT} ($x$ -- $x\\oplus-1=-1-x$), bitwise \`\`not'' of an integer.
\\item {\\tt B4$cc$} --- {\\tt FITS $cc+1$} ($x$ -- $x$), checks whether $x$ is a $cc+1$-bit signed integer for $0\\leq cc\\leq 255$ (i.e., whether $-2^{cc}\\leq x<2^{cc}$). If not, either triggers an integer overflow exception, or replaces $x$ with a {\\tt NaN} (quiet version).
\\item {\\tt B400} --- {\\tt FITS 1} or {\\tt CHKBOOL} ($x$ -- $x$), checks whether $x$ is a \`\`boolean value'' (i.e., either 0 or -1).
\\item {\\tt B5$cc$} --- {\\tt UFITS $cc+1$} ($x$ -- $x$), checks whether $x$ is a $cc+1$-bit unsigned integer for $0\\leq cc\\leq 255$ (i.e., whether $0\\leq x<2^{cc+1}$).
\\item {\\tt B500} --- {\\tt UFITS 1} or {\\tt CHKBIT}, checks whether $x$ is a binary digit (i.e., zero or one).
\\item {\\tt B600} --- {\\tt FITSX} ($x$ $c$ -- $x$), checks whether $x$ is a $c$-bit signed integer for $0\\leq c\\leq 1023$.
\\item {\\tt B601} --- {\\tt UFITSX} ($x$ $c$ -- $x$), checks whether $x$ is a $c$-bit unsigned integer for $0\\leq c\\leq 1023$.
\\item {\\tt B602} --- {\\tt BITSIZE} ($x$ -- $c$), computes smallest $c\\geq0$ such that $x$ fits into a $c$-bit signed integer ($-2^{c-1}\\leq c<2^{c-1}$).
\\item {\\tt B603} --- {\\tt UBITSIZE} ($x$ -- $c$), computes smallest $c\\geq0$ such that $x$ fits into a $c$-bit unsigned integer ($0\\leq x<2^c$), or throws a range check exception.
\\item {\\tt B608} --- {\\tt MIN} ($x$ $y$ -- $x$ or $y$), computes the minimum of two integers $x$ and $y$.
\\item {\\tt B609} --- {\\tt MAX} ($x$ $y$ -- $x$ or $y$), computes the maximum of two integers $x$ and $y$.
\\item {\\tt B60A} --- {\\tt MINMAX} or {\\tt INTSORT2} ($x$ $y$ -- $x$ $y$ or $y$ $x$), sorts two integers. Quiet version of this operation returns two {\\tt NaN}s if any of the arguments are {\\tt NaN}s.
\\item {\\tt B60B} --- {\\tt ABS} ($x$ -- $|x|$), computes the absolute value of an integer~$x$.
\\end{itemize}

\\nxsubpoint\\emb{Quiet arithmetic primitives}
We opted to make all arithmetic operations \`\`non-quiet'' (signaling) by default, and create their quiet counterparts by means of a prefix. Such an encoding is definitely sub-optimal. It is not yet clear whether it should be done in this way, or in the opposite way by making all arithmetic operations quiet by default, or whether quiet and non-quiet operations should be given opcodes of equal length; this can only be settled by practice.
\\begin{itemize}
\\item {\\tt B7xx} --- {\\tt QUIET} prefix, transforming any arithmetic operation into its \`\`quiet'' variant, indicated by prefixing a {\\tt Q} to its mnemonic. Such operations return {\\tt NaN}s instead of throwing integer overflow exceptions if the results do not fit in {\\it Integer\\/}s, or if one of their arguments is a {\\tt NaN}. Notice that this does not extend to shift amounts and other parameters that must be within a small range (e.g., 0--1023). Also notice that this does not disable type-checking exceptions if a value of a type other than {\\it Integer\\/} is supplied. 
\\item {\\tt B7A0} --- {\\tt QADD} ($x$ $y$ -- $x+y$), always works if $x$ and $y$ are {\\it Integer\\/}s, but returns a {\\tt NaN} if the addition cannot be performed.
\\item {\\tt B7A904} --- {\\tt QDIV} ($x$ $y$ -- $\\lfloor x/y\\rfloor$), returns a {\\tt NaN} if $y=0$, or if $y=-1$ and $x=-2^{256}$, or if either of $x$ or $y$ is a {\\tt NaN}.
\\item {\\tt B7B0} --- {\\tt QAND} ($x$ $y$ -- $x\\&y$), bitwise \`\`and'' (similar to {\\tt AND}), but returns a {\\tt NaN} if either $x$ or $y$ is a {\\tt NaN} instead of throwing an integer overflow exception. However, if one of the arguments is zero, and the other is a {\\tt NaN}, the result is zero.
\\item {\\tt B7B1} --- {\\tt QOR} ($x$ $y$ -- $x\\vee y$), bitwise \`\`or''. If $x=-1$ or $y=-1$, the result is always $-1$, even if the other argument is a {\\tt NaN}.
\\item {\\tt B7B507} --- {\\tt QUFITS 8} ($x$ -- $x'$), checks whether $x$ is an unsigned byte (i.e., whether $0\\leq x<2^8$), and replaces $x$ with a {\\tt NaN} if this is not the case; leaves $x$ intact otherwise (i.e., if $x$ is an unsigned byte).
\\end{itemize}

\\mysubsection{Comparison primitives}

\\nxsubpoint\\emb{Integer comparison}
All integer comparison primitives return integer $-1$ (\`\`true'') or $0$ (\`\`false'') to indicate the result of the comparison. We do not define their \`\`boolean circuit'' counterparts, which would transfer control to {\\tt c0} or {\\tt c1} depending on the result of the comparison. If needed, such instructions can be simulated with the aid of {\\tt RETBOOL}.

Quiet versions of integer comparison primitives are also available, encoded with the aid of the {\\tt QUIET} prefix ({\\tt B7}). If any of the integers being compared are {\\tt NaN}s, the result of a quiet comparison will also be a {\\tt NaN} (\`\`undefined''), instead of a $-1$ (\`\`yes'') or $0$ (\`\`no''), thus effectively supporting ternary logic.

\\begin{itemize}
\\item {\\tt B8} --- {\\tt SGN} ($x$ -- $\\sgn(x)$), computes the sign of an integer $x$: $-1$ if $x<0$, $0$ if $x=0$, $1$ if $x>0$.
\\item {\\tt B9} --- {\\tt LESS} ($x$ $y$ -- $x<y$), returns $-1$ if $x<y$, $0$ otherwise.
\\item {\\tt BA} --- {\\tt EQUAL} ($x$ $y$ -- $x=y$), returns $-1$ if $x=y$, $0$ otherwise.
\\item {\\tt BB} --- {\\tt LEQ} ($x$ $y$ -- $x\\leq y$).
\\item {\\tt BC} --- {\\tt GREATER} ($x$ $y$ -- $x>y$).
\\item {\\tt BD} --- {\\tt NEQ} ($x$ $y$ -- $x\\neq y$), equivalent to {\\tt EQUAL}; {\\tt NOT}.
\\item {\\tt BE} --- {\\tt GEQ} ($x$ $y$ -- $x\\geq y$), equivalent to {\\tt LESS}; {\\tt NOT}.
\\item {\\tt BF} --- {\\tt CMP} ($x$ $y$ -- $\\sgn(x-y)$), computes the sign of $x-y$: $-1$ if $x<y$, $0$ if $x=y$, $1$ if $x>y$. No integer overflow can occur here unless $x$ or $y$ is a {\\tt NaN}.
\\item {\\tt C0$yy$} --- {\\tt EQINT $yy$} ($x$ -- $x=yy$) for $-2^7\\leq yy<2^7$.
\\item {\\tt C000} --- {\\tt ISZERO}, checks whether an integer is zero. Corresponds to Forth's {\\tt 0=}.
\\item {\\tt C1$yy$} --- {\\tt LESSINT $yy$} ($x$ -- $x<yy$) for $-2^7\\leq yy<2^7$.
\\item {\\tt C100} --- {\\tt ISNEG}, checks whether an integer is negative. Corresponds to Forth's {\\tt 0<}.
\\item {\\tt C101} --- {\\tt ISNPOS}, checks whether an integer is non-positive.
\\item {\\tt C2$yy$} --- {\\tt GTINT $yy$} ($x$ -- $x>yy$) for $-2^7\\leq yy<2^7$.
\\item {\\tt C200} --- {\\tt ISPOS}, checks whether an integer is positive. Corresponds to Forth's {\\tt 0>}.
\\item {\\tt C2FF} --- {\\tt ISNNEG}, checks whether an integer is non-negative.
\\item {\\tt C3$yy$} --- {\\tt NEQINT $yy$} ($x$ -- $x\\neq yy$) for $-2^7\\leq yy<2^7$.
\\item {\\tt C4} --- {\\tt ISNAN} ($x$ -- $x={\\tt NaN}$), checks whether $x$ is a {\\tt NaN}.
\\item {\\tt C5} --- {\\tt CHKNAN} ($x$ -- $x$), throws an arithmetic overflow exception if $x$ is a {\\tt NaN}.
\\item {\\tt C6} --- reserved for integer comparison.
\\end{itemize}

\\nxsubpoint\\emb{Other comparison}

Most of these \`\`other comparison'' primitives actually compare the data portions of {\\em Slice\\/}s as bitstrings.

\\begin{itemize}
\\item {\\tt C700} --- {\\tt SEMPTY} ($s$ -- $s=\\emptyset$), checks whether a {\\em Slice\\/ $s$} is empty (i.e., contains no bits of data and no cell references).
\\item {\\tt C701} --- {\\tt SDEMPTY} ($s$ -- $s\\approx\\emptyset$), checks whether {\\em Slice\\/ $s$} has no bits of data.
\\item {\\tt C702} --- {\\tt SREMPTY} ($s$ -- $r(s)=0$), checks whether {\\em Slice\\/} $s$ has no references.
\\item {\\tt C703} --- {\\tt SDFIRST} ($s$ -- $s_0=1$), checks whether the first bit of {\\em Slice\\/} $s$ is a one.
\\item {\\tt C704} --- {\\tt SDLEXCMP} ($s$ $s'$ -- $c$), compares the data of $s$ lexicographically with the data of $s'$, returning $-1$, 0, or 1 depending on the result.
\\item {\\tt C705} --- {\\tt SDEQ} ($s$ $s'$ -- $s\\approx s'$), checks whether the data parts of $s$ and $s'$ coincide, equivalent to {\\tt SDLEXCMP}; {\\tt ISZERO}.
\\item {\\tt C708} --- {\\tt SDPFX} ($s$ $s'$ -- $?$), checks whether $s$ is a prefix of $s'$.
\\item {\\tt C709} --- {\\tt SDPFXREV} ($s$ $s'$ -- $?$), checks whether $s'$ is a prefix of $s$, equivalent to {\\tt SWAP}; {\\tt SDPFX}.
\\item {\\tt C70A} --- {\\tt SDPPFX} ($s$ $s'$ -- $?$), checks whether $s$ is a proper prefix of $s'$ (i.e., a prefix distinct from $s'$).
\\item {\\tt C70B} --- {\\tt SDPPFXREV} ($s$ $s'$ -- $?$), checks whether $s'$ is a proper prefix of $s$.
\\item {\\tt C70C} --- {\\tt SDSFX} ($s$ $s'$ -- $?$), checks whether $s$ is a suffix of $s'$.
\\item {\\tt C70D} --- {\\tt SDSFXREV} ($s$ $s'$ -- $?$), checks whether $s'$ is a suffix of $s$.
\\item {\\tt C70E} --- {\\tt SDPSFX} ($s$ $s'$ -- $?$), checks whether $s$ is a proper suffix of $s'$.
\\item {\\tt C70F} --- {\\tt SDPSFXREV} ($s$ $s'$ -- $?$), checks whether $s'$ is a proper suffix of $s$.
\\item {\\tt C710} --- {\\tt SDCNTLEAD0} ($s$ -- $n$), returns the number of leading zeroes in $s$.
\\item {\\tt C711} --- {\\tt SDCNTLEAD1} ($s$ -- $n$), returns the number of leading ones in $s$.
\\item {\\tt C712} --- {\\tt SDCNTTRAIL0} ($s$ -- $n$), returns the number of trailing zeroes in $s$.
\\item {\\tt C713} --- {\\tt SDCNTTRAIL1} ($s$ -- $n$), returns the number of trailing ones in $s$.
\\end{itemize}

\\mysubsection{Cell primitives}

The cell primitives are mostly either {\\em cell serialization primitives}, which work with {\\em Builder\\/}s, or {\\em cell deserialization primitives}, which work with {\\em Slice\\/}s.

\\nxsubpoint\\emb{Cell serialization primitives}\\label{sp:prim.ser}
All these primitives first check whether there is enough space in the Builder, and only then check the range of the value being serialized.
\\begin{itemize}
\\item {\\tt C8} --- {\\tt NEWC} ( -- $b$), creates a new empty {\\em Builder}.
\\item {\\tt C9} --- {\\tt ENDC} ($b$ -- $c$), converts a {\\em Builder} into an ordinary {\\em Cell}.
\\item {\\tt CA$cc$} --- {\\tt STI $cc+1$} ($x$ $b$ -- $b'$), stores a signed $cc+1$-bit integer $x$ into {\\em Builder\\/} $b$ for $0\\leq cc\\leq 255$, throws a range check exception if $x$ does not fit into $cc+1$ bits.
\\item {\\tt CB$cc$} --- {\\tt STU $cc+1$} ($x$ $b$ -- $b'$), stores an unsigned $cc+1$-bit integer $x$ into {\\em Builder\\/} $b$. In all other respects it is similar to {\\tt STI}.
\\item {\\tt CC} --- {\\tt STREF} ($c$ $b$ -- $b'$), stores a reference to {\\em Cell\\/} $c$ into {\\em Builder\\/} $b$.
\\item {\\tt CD} --- {\\tt STBREFR} or {\\tt ENDCST} ($b$ $b''$ -- $b$), equivalent to {\\tt ENDC}; {\\tt SWAP}; {\\tt STREF}.
\\item {\\tt CE} --- {\\tt STSLICE} ($s$ $b$ -- $b'$), stores {\\em Slice\\/} $s$ into {\\em Builder\\/} $b$.
\\item {\\tt CF00} --- {\\tt STIX} ($x$ $b$ $l$ -- $b'$), stores a signed $l$-bit integer $x$ into $b$ for $0\\leq l\\leq 257$.
\\item {\\tt CF01} --- {\\tt STUX} ($x$ $b$ $l$ -- $b'$), stores an unsigned $l$-bit integer $x$ into $b$ for $0\\leq l\\leq 256$.
\\item {\\tt CF02} --- {\\tt STIXR} ($b$ $x$ $l$ -- $b'$), similar to {\\tt STIX}, but with arguments in a different order.
\\item {\\tt CF03} --- {\\tt STUXR} ($b$ $x$ $l$ -- $b'$), similar to {\\tt STUX}, but with arguments in a different order.
\\item {\\tt CF04} --- {\\tt STIXQ} ($x$ $b$ $l$ -- $x$ $b$ $f$ or $b'$ $0$), a quiet version of {\\tt STIX}. If there is no space in $b$, sets $b'=b$ and $f=-1$. If $x$ does not fit into $l$ bits, sets $b'=b$ and $f=1$. If the operation succeeds, $b'$ is the new {\\em Builder\\/} and $f=0$. However, $0\\leq l\\leq 257$, with a range check exception if this is not so.
\\item {\\tt CF05} --- {\\tt STUXQ} ($x$ $b$ $l$ -- $b'$ $f$).
\\item {\\tt CF06} --- {\\tt STIXRQ} ($b$ $x$ $l$ -- $b$ $x$ $f$ or $b'$ $0$).
\\item {\\tt CF07} --- {\\tt STUXRQ} ($b$ $x$ $l$ -- $b$ $x$ $f$ or $b'$ $0$).
\\item {\\tt CF08$cc$} --- a longer version of {\\tt STI $cc+1$}.
\\item {\\tt CF09$cc$} --- a longer version of {\\tt STU $cc+1$}.
\\item {\\tt CF0A$cc$} --- {\\tt STIR $cc+1$} ($b$ $x$ -- $b'$), equivalent to {\\tt SWAP}; {\\tt STI $cc+1$}.
\\item {\\tt CF0B$cc$} --- {\\tt STUR $cc+1$} ($b$ $x$ -- $b'$), equivalent to {\\tt SWAP}; {\\tt STU $cc+1$}.
\\item {\\tt CF0C$cc$} --- {\\tt STIQ $cc+1$} ($x$ $b$ -- $x$ $b$ $f$ or $b'$ $0$).
\\item {\\tt CF0D$cc$} --- {\\tt STUQ $cc+1$} ($x$ $b$ -- $x$ $b$ $f$ or $b'$ $0$).
\\item {\\tt CF0E$cc$} --- {\\tt STIRQ $cc+1$} ($b$ $x$ -- $b$ $x$ $f$ or $b'$ $0$).
\\item {\\tt CF0F$cc$} --- {\\tt STURQ $cc+1$} ($b$ $x$ -- $b$ $x$ $f$ or $b'$ $0$).
\\item {\\tt CF10} --- a longer version of {\\tt STREF} ($c$ $b$ -- $b'$).
\\item {\\tt CF11} --- {\\tt STBREF} ($b'$ $b$ -- $b''$), equivalent to {\\tt SWAP}; {\\tt STBREFREV}.
\\item {\\tt CF12} --- a longer version of {\\tt STSLICE} ($s$ $b$ -- $b'$).
\\item {\\tt CF13} --- {\\tt STB} ($b'$ $b$ -- $b''$), appends all data from {\\em Builder\\/} $b'$ to {\\em Builder\\/} $b$.
\\item {\\tt CF14} --- {\\tt STREFR} ($b$ $c$ -- $b'$).
\\item {\\tt CF15} --- {\\tt STBREFR} ($b$ $b'$ -- $b''$), a longer encoding of {\\tt STBREFR}.
\\item {\\tt CF16} --- {\\tt STSLICER} ($b$ $s$ -- $b'$).
\\item {\\tt CF17} --- {\\tt STBR} ($b$ $b'$ -- $b''$), concatenates two {\\em Builder\\/}s, equivalent to {\\tt SWAP}; {\\tt STB}.
\\item {\\tt CF18} --- {\\tt STREFQ} ($c$ $b$ -- $c$ $b$ $-1$ or $b'$ $0$).
\\item {\\tt CF19} --- {\\tt STBREFQ} ($b'$ $b$ -- $b'$ $b$ $-1$ or $b''$ $0$).
\\item {\\tt CF1A} --- {\\tt STSLICEQ} ($s$ $b$ -- $s$ $b$ $-1$ or $b'$ $0$).
\\item {\\tt CF1B} --- {\\tt STBQ} ($b'$ $b$ -- $b'$ $b$ $-1$ or $b''$ $0$).
\\item {\\tt CF1C} --- {\\tt STREFRQ} ($b$ $c$ -- $b$ $c$ $-1$ or $b'$ $0$).
\\item {\\tt CF1D} --- {\\tt STBREFRQ} ($b$ $b'$ -- $b$ $b'$ $-1$ or $b''$ $0$).
\\item {\\tt CF1E} --- {\\tt STSLICERQ} ($b$ $s$ -- $b$ $s$ $-1$ or $b''$ $0$).
\\item {\\tt CF1F} --- {\\tt STBRQ} ($b$ $b'$ -- $b$ $b'$ $-1$ or $b''$ $0$).
\\item {\\tt CF20} --- {\\tt STREFCONST}, equivalent to {\\tt PUSHREF}; {\\tt STREFR}.
\\item {\\tt CF21} --- {\\tt STREF2CONST}, equivalent to {\\tt STREFCONST}; {\\tt STREFCONST}.
\\item {\\tt CF23} --- {\\tt ENDXC} ($b$ $x$ -- $c$), if $x\\neq0$, creates a {\\em special\\/} or {\\em exotic\\/} cell (cf.~\\ptref{sp:exotic.cells}) from {\\em Builder\\/} $b$. The type of the exotic cell must be stored in the first 8 bits of~$b$. If $x=0$, it is equivalent to {\\tt ENDC}. Otherwise some validity checks on the data and references of $b$ are performed before creating the exotic cell.

\\item {\\tt CF28} --- {\\tt STILE4} ($x$ $b$ -- $b'$), stores a little-endian signed 32-bit integer.
\\item {\\tt CF29} --- {\\tt STULE4} ($x$ $b$ -- $b'$), stores a little-endian unsigned 32-bit integer.
\\item {\\tt CF2A} --- {\\tt STILE8} ($x$ $b$ -- $b'$), stores a little-endian signed 64-bit integer.
\\item {\\tt CF2B} --- {\\tt STULE8} ($x$ $b$ -- $b'$), stores a little-endian unsigned 64-bit integer.
\\item {\\tt CF31} --- {\\tt BBITS} ($b$ -- $x$), returns the number of data bits already stored in {\\em Builder\\/} $b$.
\\item {\\tt CF32} --- {\\tt BREFS} ($b$ -- $y$), returns the number of cell references already stored in $b$.
\\item {\\tt CF33} --- {\\tt BBITREFS} ($b$ -- $x$ $y$), returns the numbers of both data bits and cell references in $b$.
\\item {\\tt CF35} --- {\\tt BREMBITS} ($b$ -- $x'$), returns the number of data bits that can still be stored in $b$.
\\item {\\tt CF36} --- {\\tt BREMREFS} ($b$ -- $y'$).
\\item {\\tt CF37} --- {\\tt BREMBITREFS} ($b$ -- $x'$ $y'$).
\\item {\\tt CF38$cc$} --- {\\tt BCHKBITS $cc+1$} ($b$ --), checks whether $cc+1$ bits can be stored into $b$, where $0\\leq cc\\leq 255$.
\\item {\\tt CF39} --- {\\tt BCHKBITS} ($b$ $x$ -- ), checks whether $x$ bits can be stored into $b$, $0\\leq x\\leq 1023$. If there is no space for $x$ more bits in $b$, or if $x$ is not within the range $0\\ldots1023$, throws an exception.
\\item {\\tt CF3A} --- {\\tt BCHKREFS} ($b$ $y$ -- ), checks whether $y$ references can be stored into $b$, $0\\leq y\\leq 7$.
\\item {\\tt CF3B} --- {\\tt BCHKBITREFS} ($b$ $x$ $y$ -- ), checks whether $x$ bits and $y$ references can be stored into $b$, $0\\leq x\\leq 1023$, $0\\leq y\\leq 7$.
\\item {\\tt CF3C$cc$} --- {\\tt BCHKBITSQ $cc+1$} ($b$ -- $?$), checks whether $cc+1$ bits can be stored into $b$, where $0\\leq cc\\leq 255$.
\\item {\\tt CF3D} --- {\\tt BCHKBITSQ} ($b$ $x$ -- $?$), checks whether $x$ bits can be stored into $b$, $0\\leq x\\leq 1023$.
\\item {\\tt CF3E} --- {\\tt BCHKREFSQ} ($b$ $y$ -- $?$), checks whether $y$ references can be stored into $b$, $0\\leq y\\leq 7$.
\\item {\\tt CF3F} --- {\\tt BCHKBITREFSQ} ($b$ $x$ $y$ -- $?$), checks whether $x$ bits and $y$ references can be stored into $b$, $0\\leq x\\leq 1023$, $0\\leq y\\leq 7$.
\\item {\\tt CF40} --- {\\tt STZEROES} ($b$ $n$ -- $b'$), stores $n$ binary zeroes into {\\em Builder} $b$.
\\item {\\tt CF41} --- {\\tt STONES} ($b$ $n$ -- $b'$), stores $n$ binary ones into {\\em Builder} $b$.
\\item {\\tt CF42} --- {\\tt STSAME} ($b$ $n$ $x$ -- $b'$), stores $n$ binary $x$es ($0\\leq x\\leq1$) into {\\em Builder} $b$.
\\item {\\tt CFC0\\_$xysss$} --- {\\tt STSLICECONST $sss$} ($b$ -- $b'$), stores a constant subslice $sss$ consisting of $0\\leq x\\leq 3$ references and up to $8y+1$ data bits, with $0\\leq y\\leq 7$. Completion bit is assumed.
\\item {\\tt CF81} --- {\\tt STSLICECONST \`0'} or {\\tt STZERO} ($b$ -- $b'$), stores one binary zero.
\\item {\\tt CF83} --- {\\tt STSLICECONST \`1'} or {\\tt STONE} ($b$ -- $b'$), stores one binary one.
\\item {\\tt CFA2} --- equivalent to {\\tt STREFCONST}.
\\item {\\tt CFA3} --- almost equivalent to {\\tt STSLICECONST \`1'}; {\\tt STREFCONST}.
\\item {\\tt CFC2} --- equivalent to {\\tt STREF2CONST}.
\\item {\\tt CFE2} --- {\\tt STREF3CONST}.
\\end{itemize}

\\nxsubpoint\\emb{Cell deserialization primitives}\\label{sp:prim.deser}
\\begin{itemize}
\\item {\\tt D0} --- {\\tt CTOS} ($c$ -- $s$), converts a {\\em Cell\\/} into a {\\em Slice}. Notice that $c$ must be either an ordinary cell, or an exotic cell (cf.~\\ptref{sp:exotic.cells}) which is automatically {\\em loaded\\/} to yield an ordinary cell $c'$, converted into a {\\em Slice} afterwards.
\\item {\\tt D1} --- {\\tt ENDS} ($s$ -- ), removes a {\\em Slice\\/} $s$ from the stack, and throws an exception if it is not empty.
\\item {\\tt D2$cc$} --- {\\tt LDI $cc+1$} ($s$ -- $x$ $s'$), loads (i.e., parses) a signed $cc+1$-bit integer $x$ from {\\em Slice\\/} $s$, and returns the remainder of $s$ as $s'$.
\\item {\\tt D3$cc$} --- {\\tt LDU $cc+1$} ($s$ -- $x$ $s'$), loads an unsigned $cc+1$-bit integer $x$ from {\\em Slice\\/} $s$.
\\item {\\tt D4} --- {\\tt LDREF} ($s$ -- $c$ $s'$), loads a cell reference $c$ from $s$.
\\item {\\tt D5} --- {\\tt LDREFRTOS} ($s$ -- $s'$ $s''$), equivalent to {\\tt LDREF}; {\\tt SWAP}; {\\tt CTOS}.
\\item {\\tt D6$cc$} --- {\\tt LDSLICE $cc+1$} ($s$ -- $s''$ $s'$), cuts the next $cc+1$ bits of $s$ into a separate {\\em Slice\\/} $s''$.
\\item {\\tt D700} --- {\\tt LDIX} ($s$ $l$ -- $x$ $s'$), loads a signed $l$-bit ($0\\leq l\\leq 257$) integer $x$ from {\\em Slice\\/} $s$, and returns the remainder of $s$ as~$s'$.
\\item {\\tt D701} --- {\\tt LDUX} ($s$ $l$ -- $x$ $s'$), loads an unsigned $l$-bit integer $x$ from (the first $l$ bits of) $s$, with $0\\leq l\\leq 256$.
\\item {\\tt D702} --- {\\tt PLDIX} ($s$ $l$ -- $x$), preloads a signed $l$-bit integer from {\\em Slice\\/} $s$, for $0\\leq l\\leq 257$.
\\item {\\tt D703} --- {\\tt PLDUX} ($s$ $l$ -- $x$), preloads an unsigned $l$-bit integer from $s$, for $0\\leq l\\leq 256$.
\\item {\\tt D704} --- {\\tt LDIXQ} ($s$ $l$ -- $x$ $s'$ $-1$ or $s$ $0$), quiet version of {\\tt LDIX}: loads a signed $l$-bit integer from $s$ similarly to {\\tt LDIX}, but returns a success flag, equal to $-1$ on success or to $0$ on failure (if $s$ does not have $l$ bits), instead of throwing a cell underflow exception.
\\item {\\tt D705} --- {\\tt LDUXQ} ($s$ $l$ -- $x$ $s'$ $-1$ or $s$ $0$), quiet version of {\\tt LDUX}.
\\item {\\tt D706} --- {\\tt PLDIXQ} ($s$ $l$ -- $x$ $-1$ or $0$), quiet version of {\\tt PLDIX}.
\\item {\\tt D707} --- {\\tt PLDUXQ} ($s$ $l$ -- $x$ $-1$ or $0$), quiet version of {\\tt PLDUX}.
\\item {\\tt D708$cc$} --- {\\tt LDI $cc+1$} ($s$ -- $x$ $s'$), a longer encoding for {\\tt LDI}.
\\item {\\tt D709$cc$} --- {\\tt LDU $cc+1$} ($s$ -- $x$ $s'$), a longer encoding for {\\tt LDU}.
\\item {\\tt D70A$cc$} --- {\\tt PLDI $cc+1$} ($s$ -- $x$), preloads a signed $cc+1$-bit integer from {\\em Slice\\/} $s$.
\\item {\\tt D70B$cc$} --- {\\tt PLDU $cc+1$} ($s$ -- $x$), preloads an unsigned $cc+1$-bit integer from $s$.
\\item {\\tt D70C$cc$} --- {\\tt LDIQ $cc+1$} ($s$ -- $x$ $s'$ $-1$ or $s$ $0$), a quiet version of {\\tt LDI}.
\\item {\\tt D70D$cc$} --- {\\tt LDUQ $cc+1$} ($s$ -- $x$ $s'$ $-1$ or $s$ $0$), a quiet version of {\\tt LDU}.
\\item {\\tt D70E$cc$} --- {\\tt PLDIQ $cc+1$} ($s$ -- $x$ $-1$ or $0$), a quiet version of {\\tt PLDI}.
\\item {\\tt D70F$cc$} --- {\\tt PLDUQ $cc+1$} ($s$ -- $x$ $-1$ or $0$), a quiet version of {\\tt PLDU}.
\\item {\\tt D714\\_$c$} --- {\\tt PLDUZ $32(c+1)$} ($s$ -- $s$ $x$), preloads the first $32(c+1)$ bits of {\\em Slice\\/} $s$ into an unsigned integer $x$, for $0\\leq c\\leq 7$. If $s$ is shorter than necessary, missing bits are assumed to be zero. This operation is intended to be used along with {\\tt IFBITJMP} and similar instructions.
\\item {\\tt D718} --- {\\tt LDSLICEX} ($s$ $l$ -- $s''$ $s'$), loads the first $0\\leq l\\leq 1023$ bits from {\\em Slice\\/} $s$ into a separate {\\em Slice\\/} $s''$, returning the remainder of $s$ as $s'$.
\\item {\\tt D719} --- {\\tt PLDSLICEX} ($s$ $l$ -- $s''$), returns the first $0\\leq l\\leq 1023$ bits of $s$ as $s''$.
\\item {\\tt D71A} --- {\\tt LDSLICEXQ} ($s$ $l$ -- $s''$ $s'$ $-1$ or $s$ $0$), a quiet version of {\\tt LDSLICEX}.
\\item {\\tt D71B} --- {\\tt PLDSLICEXQ} ($s$ $l$ -- $s'$ $-1$ or $0$), a quiet version of {\\tt LDSLICEXQ}.
\\item {\\tt D71C$cc$} --- {\\tt LDSLICE $cc+1$} ($s$ -- $s''$ $s'$), a longer encoding for {\\tt LDSLICE}.
\\item {\\tt D71D$cc$} --- {\\tt PLDSLICE $cc+1$} ($s$ -- $s''$), returns the first $0<cc+1\\leq 256$ bits of $s$ as $s''$.
\\item {\\tt D71E$cc$} --- {\\tt LDSLICEQ $cc+1$} ($s$ -- $s''$ $s'$ $-1$ or $s$ $0$), a quiet version of {\\tt LDSLICE}.
\\item {\\tt D71F$cc$} --- {\\tt PLDSLICEQ $cc+1$} ($s$ -- $s''$ $-1$ or $0$), a quiet version of {\\tt PLDSLICE}.
\\item {\\tt D720} --- {\\tt SDCUTFIRST} ($s$ $l$ -- $s'$), returns the first $0\\leq l\\leq 1023$ bits of $s$. It is equivalent to {\\tt PLDSLICEX}.
\\item {\\tt D721} --- {\\tt SDSKIPFIRST} ($s$ $l$ -- $s'$), returns all but the first $0\\leq l\\leq 1023$ bits of $s$. It is equivalent to {\\tt LDSLICEX}; {\\tt NIP}.
\\item {\\tt D722} --- {\\tt SDCUTLAST} ($s$ $l$ -- $s'$), returns the last $0\\leq l\\leq 1023$ bits of $s$.
\\item {\\tt D723} --- {\\tt SDSKIPLAST} ($s$ $l$ -- $s'$), returns all but the last $0\\leq l\\leq 1023$ bits of $s$.
\\item {\\tt D724} --- {\\tt SDSUBSTR} ($s$ $l$ $l'$ -- $s'$), returns $0\\leq l'\\leq 1023$ bits of $s$ starting from offset $0\\leq l\\leq 1023$, thus extracting a bit substring out of the data of~$s$.
\\item {\\tt D726} --- {\\tt SDBEGINSX} ($s$ $s'$ -- $s''$), checks whether $s$ begins with (the data bits of) $s'$, and removes $s'$ from $s$ on success. On failure throws a cell deserialization exception. Primitive {\\tt SDPFXREV} can be considered a quiet version of {\\tt SDBEGINSX}.
\\item {\\tt D727} --- {\\tt SDBEGINSXQ} ($s$ $s'$ -- $s''$ $-1$ or $s$ $0$), a quiet version of {\\tt SDBEGINSX}.
\\item {\\tt D72A\\_$xsss$} --- {\\tt SDBEGINS} ($s$ -- $s''$), checks whether $s$ begins with constant bitstring $sss$ of length $8x+3$ (with continuation bit assumed), where $0\\leq x\\leq 127$, and removes $sss$ from $s$ on success.
\\item {\\tt D72802} --- {\\tt SDBEGINS \`0'} ($s$ -- $s''$), checks whether $s$ begins with a binary zero.
\\item {\\tt D72806} --- {\\tt SDBEGINS \`1'} ($s$ -- $s''$), checks whether $s$ begins with a binary one.
\\item {\\tt D72E\\_$xsss$} --- {\\tt SDBEGINSQ} ($s$ -- $s''$ $-1$ or $s$ $0$), a quiet version of {\\tt SDBEGINS}.
\\item {\\tt D730} --- {\\tt SCUTFIRST} ($s$ $l$ $r$ -- $s'$), returns the first $0\\leq l\\leq 1023$ bits and first $0\\leq r\\leq 4$ references of $s$.
\\item {\\tt D731} --- {\\tt SSKIPFIRST} ($s$ $l$ $r$ -- $s'$).
\\item {\\tt D732} --- {\\tt SCUTLAST} ($s$ $l$ $r$ -- $s'$), returns the last $0\\leq l\\leq 1023$ data bits and last $0\\leq r\\leq 4$ references of $s$.
\\item {\\tt D733} --- {\\tt SSKIPLAST} ($s$ $l$ $r$ -- $s'$).
\\item {\\tt D734} --- {\\tt SUBSLICE} ($s$ $l$ $r$ $l'$ $r'$ -- $s'$), returns $0\\leq l'\\leq 1023$ bits and $0\\leq r'\\leq 4$ references from {\\em Slice\\/} $s$, after skipping the first $0\\leq l\\leq 1023$ bits and first $0\\leq r\\leq 4$ references.
\\item {\\tt D736} --- {\\tt SPLIT} ($s$ $l$ $r$ -- $s'$ $s''$), splits the first $0\\leq l\\leq 1023$ data bits and first $0\\leq r\\leq 4$ references from $s$ into $s'$, returning the remainder of $s$ as $s''$.
\\item {\\tt D737} --- {\\tt SPLITQ} ($s$ $l$ $r$ -- $s'$ $s''$ $-1$ or $s$ $0$), a quiet version of {\\tt SPLIT}.
\\item {\\tt D739} --- {\\tt XCTOS} ($c$ -- $s$ $?$), transforms an ordinary or exotic cell into a {\\em Slice}, as if it were an ordinary cell. A flag is returned indicating whether $c$ is exotic. If that be the case, its type can later be deserialized from the first eight bits of~$s$.
\\item {\\tt D73A} --- {\\tt XLOAD} ($c$ -- $c'$), loads an exotic cell $c$ and returns an ordinary cell $c'$. If $c$ is already ordinary, does nothing. If $c$ cannot be loaded, throws an exception.
\\item {\\tt D73B} --- {\\tt XLOADQ} ($c$ -- $c'$ $-1$ or $c$ $0$), loads an exotic cell $c$ as {\\tt XLOAD}, but returns 0 on failure.
\\item {\\tt D741} --- {\\tt SCHKBITS} ($s$ $l$ -- ), checks whether there are at least $l$ data bits in {\\em Slice\\/} $s$. If this is not the case, throws a cell deserialisation (i.e., cell underflow) exception.
\\item {\\tt D742} --- {\\tt SCHKREFS} ($s$ $r$ -- ), checks whether there are at least $r$ references in {\\em Slice\\/} $s$.
\\item {\\tt D743} --- {\\tt SCHKBITREFS} ($s$ $l$ $r$ -- ), checks whether there are at least $l$ data bits and $r$ references in {\\em Slice\\/} $s$.
\\item {\\tt D745} --- {\\tt SCHKBITSQ} ($s$ $l$ -- $?$), checks whether there are at least $l$ data bits in {\\em Slice\\/} $s$.
\\item {\\tt D746} --- {\\tt SCHKREFSQ} ($s$ $r$ -- $?$), checks whether there are at least $r$ references in {\\em Slice\\/} $s$.
\\item {\\tt D747} --- {\\tt SCHKBITREFSQ} ($s$ $l$ $r$ -- $?$), checks whether there are at least $l$ data bits and $r$ references in {\\em Slice\\/} $s$.
\\item {\\tt D748} --- {\\tt PLDREFVAR} ($s$ $n$ -- $c$), returns the $n$-th cell reference of {\\em Slice\\/}~$s$ for $0\\leq n\\leq 3$.
\\item {\\tt D749} --- {\\tt SBITS} ($s$ -- $l$), returns the number of data bits in {\\em Slice\\/} $s$.
\\item {\\tt D74A} --- {\\tt SREFS} ($s$ -- $r$), returns the number of references in {\\em Slice\\/} $s$.
\\item {\\tt D74B} --- {\\tt SBITREFS} ($s$ -- $l$ $r$), returns both the number of data bits and the number of references in~$s$.
\\item {\\tt D74E\\_$n$} --- {\\tt PLDREFIDX $n$} ($s$ -- $c$), returns the $n$-th cell reference of {\\em Slice\\/}~$s$, where $0\\leq n\\leq 3$.
\\item {\\tt D74C} --- {\\tt PLDREF} ($s$ -- $c$), preloads the first cell reference of a {\\em Slice}.
\\item {\\tt D750} --- {\\tt LDILE4} ($s$ -- $x$ $s'$), loads a little-endian signed 32-bit integer. 
\\item {\\tt D751} --- {\\tt LDULE4} ($s$ -- $x$ $s'$), loads a little-endian unsigned 32-bit integer. 
\\item {\\tt D752} --- {\\tt LDILE8} ($s$ -- $x$ $s'$), loads a little-endian signed 64-bit integer. 
\\item {\\tt D753} --- {\\tt LDULE8} ($s$ -- $x$ $s'$), loads a little-endian unsigned 64-bit integer. 
\\item {\\tt D754} --- {\\tt PLDILE4} ($s$ -- $x$), preloads a little-endian signed 32-bit integer. 
\\item {\\tt D755} --- {\\tt PLDULE4} ($s$ -- $x$), preloads a little-endian unsigned 32-bit integer. 
\\item {\\tt D756} --- {\\tt PLDILE8} ($s$ -- $x$), preloads a little-endian signed 64-bit integer. 
\\item {\\tt D757} --- {\\tt PLDULE8} ($s$ -- $x$), preloads a little-endian unsigned 64-bit integer. 
\\item {\\tt D758} --- {\\tt LDILE4Q} ($s$ -- $x$ $s'$ $-1$ or $s$ $0$), quietly loads a little-endian signed 32-bit integer. 
\\item {\\tt D759} --- {\\tt LDULE4Q} ($s$ -- $x$ $s'$ $-1$ or $s$ $0$), quietly loads a little-endian unsigned 32-bit integer. 
\\item {\\tt D75A} --- {\\tt LDILE8Q} ($s$ -- $x$ $s'$ $-1$ or $s$ $0$), quietly loads a little-endian signed 64-bit integer. 
\\item {\\tt D75B} --- {\\tt LDULE8Q} ($s$ -- $x$ $s'$ $-1$ or $s$ $0$), quietly loads a little-endian unsigned 64-bit integer. 
\\item {\\tt D75C} --- {\\tt PLDILE4Q} ($s$ -- $x$ $-1$ or $0$), quietly preloads a little-endian signed 32-bit integer. 
\\item {\\tt D75D} --- {\\tt PLDULE4Q} ($s$ -- $x$ $-1$ or $0$), quietly preloads a little-endian unsigned 32-bit integer. 
\\item {\\tt D75E} --- {\\tt PLDILE8Q} ($s$ -- $x$ $-1$ or $0$), quietly preloads a little-endian signed 64-bit integer. 
\\item {\\tt D75F} --- {\\tt PLDULE8Q} ($s$ -- $x$ $-1$ or $0$), quietly preloads a little-endian unsigned 64-bit integer.
\\item {\\tt D760} --- {\\tt LDZEROES} ($s$ -- $n$ $s'$), returns the count $n$ of leading zero bits in $s$, and removes these bits from $s$.
\\item {\\tt D761} --- {\\tt LDONES} ($s$ -- $n$ $s'$), returns the count $n$ of leading one bits in $s$, and removes these bits from $s$.
\\item {\\tt D762} --- {\\tt LDSAME} ($s$ $x$ -- $n$ $s'$), returns the count $n$ of leading bits equal to $0\\leq x\\leq 1$ in $s$, and removes these bits from $s$.
\\end{itemize}

\\mysubsection{Continuation and control flow primitives}

\\nxsubpoint\\emb{Unconditional control flow primitives}
\\begin{itemize}
\\item {\\tt D8} --- {\\tt EXECUTE} or {\\tt CALLX} ($c$ -- ), {\\em calls\\/} or {\\em executes\\/} continuation $c$ (i.e., \${\\tt cc}\\leftarrow c\\circ_0{\\tt cc}$).
\\item {\\tt D9} --- {\\tt JMPX} ($c$ -- ), {\\em jumps\\/}, or transfers control, to continuation $c$ (i.e., \${\\tt cc}\\leftarrow c\\circ_0{\\tt c0}$, or rather \${\\tt cc}\\leftarrow(c\\circ_0{\\tt c0})\\circ_1{\\tt c1}$). The remainder of the previous current continuation {\\tt cc} is discarded.
\\item {\\tt DA$pr$} --- {\\tt CALLXARGS $p$,$r$} ($c$ -- ), {\\em calls\\/} continuation $c$ with $p$ parameters and expecting $r$ return values, $0\\leq p\\leq15$, $0\\leq r\\leq 15$.
\\item {\\tt DB0$p$} --- {\\tt CALLXARGS $p$,$-1$} ($c$ -- ), {\\em calls\\/} continuation $c$ with $0\\leq p\\leq15$ parameters, expecting an arbitrary number of return values.
\\item {\\tt DB1$p$} --- {\\tt JMPXARGS $p$} ($c$ -- ), {\\em jumps\\/} to continuation $c$, passing only the top $0\\leq p\\leq 15$ values from the current stack to it (the remainder of the current stack is discarded).
\\item {\\tt DB2$r$} --- {\\tt RETARGS $r$}, {\\em returns} to {\\tt c0}, with $0\\leq r\\leq 15$ return values taken from the current stack.
\\item {\\tt DB30} --- {\\tt RET} or {\\tt RETTRUE}, {\\em returns} to the continuation at {\\tt c0} (i.e., performs \${\\tt cc}\\leftarrow{\\tt c0}$). The remainder of the current continuation {\\tt cc} is discarded. Approximately equivalent to {\\tt PUSH c0}; {\\tt JMPX}.
\\item {\\tt DB31} --- {\\tt RETALT} or {\\tt RETFALSE}, {\\em returns} to the continuation at {\\tt c1} (i.e., \${\\tt cc}\\leftarrow{\\tt c1}$). Approximately equivalent to {\\tt PUSH c1}; {\\tt JMPX}.
\\item {\\tt DB32} --- {\\tt BRANCH} or {\\tt RETBOOL} ($f$ -- ), performs {\\tt RETTRUE} if integer $f\\neq 0$, or {\\tt RETFALSE} if $f=0$.
\\item {\\tt DB34} --- {\\tt CALLCC} ($c$ -- ), {\\em call with current continuation}, transfers control to $c$, pushing the old value of {\\tt cc} into $c$'s stack (instead of discarding it or writing it into new {\\tt c0}).
\\item {\\tt DB35} --- {\\tt JMPXDATA} ($c$ -- ), similar to {\\tt CALLCC}, but the remainder of the current continuation (the old value of {\\tt cc}) is converted into a {\\em Slice\\/} before pushing it into the stack of $c$.
\\item {\\tt DB36$pr$} --- {\\tt CALLCCARGS $p$,$r$} ($c$ -- ), similar to {\\tt CALLXARGS}, but pushes the old value of {\\tt cc} (along with the top $0\\leq p\\leq 15$ values from the original stack) into the stack of newly-invoked continuation $c$, setting {\\tt cc.nargs} to $-1\\leq r\\leq 14$.
\\item {\\tt DB38} --- {\\tt CALLXVARARGS} ($c$ $p$ $r$ -- ), similar to {\\tt CALLXARGS}, but takes $-1\\leq p,r\\leq254$ from the stack. The next three operations also take $p$ and $r$ from the stack, both in the range $-1\\ldots254$.
\\item {\\tt DB39} --- {\\tt RETVARARGS} ($p$ $r$ -- ), similar to {\\tt RETARGS}.
\\item {\\tt DB3A} --- {\\tt JMPXVARARGS} ($c$ $p$ $r$ -- ), similar to {\\tt JMPXARGS}.
\\item {\\tt DB3B} --- {\\tt CALLCCVARARGS} ($c$ $p$ $r$ -- ), similar to {\\tt CALLCCARGS}.
\\item {\\tt DB3C} --- {\\tt CALLREF}, equivalent to {\\tt PUSHREFCONT}; {\\tt CALLX}.
\\item {\\tt DB3D} --- {\\tt JMPREF}, equivalent to {\\tt PUSHREFCONT}; {\\tt JMPX}.
\\item {\\tt DB3E} --- {\\tt JMPREFDATA}, equivalent to {\\tt PUSHREFCONT}; {\\tt JMPXDATA}.
\\item {\\tt DB3F} --- {\\tt RETDATA}, equivalent to {\\tt PUSH c0}; {\\tt JMPXDATA}. In this way, the remainder of the current continuation is converted into a {\\em Slice\\/} and returned to the caller.
\\end{itemize}

\\nxsubpoint\\emb{Conditional control flow primitives}\\label{sp:prim.cond.flow}
\\begin{itemize}
\\item {\\tt DC} --- {\\tt IFRET} ($f$ -- ), performs a {\\tt RET}, but only if integer $f$ is non-zero. If $f$ is a {\\tt NaN}, throws an integer overflow exception.
\\item {\\tt DD} --- {\\tt IFNOTRET} ($f$ -- ), performs a {\\tt RET}, but only if integer $f$ is zero.
\\item {\\tt DE} --- {\\tt IF} ($f$ $c$ -- ), performs {\\tt EXECUTE} for $c$ (i.e., {\\em executes} $c$), but only if integer $f$ is non-zero. Otherwise simply discards both values.
\\item {\\tt DF} --- {\\tt IFNOT} ($f$ $c$ -- ), executes continuation $c$, but only if integer $f$ is zero. Otherwise simply discards both values.
\\item {\\tt E0} --- {\\tt IFJMP} ($f$ $c$ -- ), jumps to $c$ (similarly to {\\tt JMPX}), but only if $f$ is non-zero.
\\item {\\tt E1} --- {\\tt IFNOTJMP} ($f$ $c$ -- ), jumps to $c$ (similarly to {\\tt JMPX}), but only if $f$ is zero.
\\item {\\tt E2} --- {\\tt IFELSE} ($f$ $c$ $c'$ -- ), if integer $f$ is non-zero, executes $c$, otherwise executes $c'$. Equivalent to {\\tt CONDSELCHK}; {\\tt EXECUTE}.
\\item {\\tt E300} --- {\\tt IFREF} ($f$ -- ), equivalent to {\\tt PUSHREFCONT}; {\\tt IF}.
\\item {\\tt E301} --- {\\tt IFNOTREF} ($f$ -- ), equivalent to {\\tt PUSHREFCONT}; {\\tt IFNOT}.
\\item {\\tt E302} --- {\\tt IFJMPREF} ($f$ -- ), equivalent to {\\tt PUSHREFCONT}; {\\tt IFJMP}.
\\item {\\tt E303} --- {\\tt IFNOTJMPREF} ($f$ -- ), equivalent to {\\tt PUSHREFCONT}; {\\tt IFNOTJMP}.
\\item {\\tt E304} --- {\\tt CONDSEL} ($f$ $x$ $y$ -- $x$ or $y$), if integer $f$ is non-zero, returns $x$, otherwise returns $y$. Notice that no type checks are performed on $x$ and $y$; as such, it is more like a conditional stack operation. Roughly equivalent to {\\tt ROT}; {\\tt ISZERO}; {\\tt INC}; {\\tt ROLLX}; {\\tt NIP}.
\\item {\\tt E305} --- {\\tt CONDSELCHK} ($f$ $x$ $y$ -- $x$ or $y$), same as {\\tt CONDSEL}, but first checks whether $x$ and $y$ have the same type.
\\item {\\tt E308} --- {\\tt IFRETALT} ($f$ --), performs {\\tt RETALT} if integer $f\\neq0$.
\\item {\\tt E309} --- {\\tt IFNOTRETALT} ($f$ --), performs {\\tt RETALT} if integer $f=0$.
\\item {\\tt E39\\_$n$} --- {\\tt IFBITJMP $n$} ($x$ $c$ -- $x$), checks whether bit $0\\leq n\\leq 31$ is set in integer $x$, and if so, performs {\\tt JMPX} to continuation~$c$. Value $x$ is left in the stack.
\\item {\\tt E3B\\_$n$} --- {\\tt IFNBITJMP $n$} ($x$ $c$ -- $x$), jumps to $c$ if bit $0\\leq n\\leq 31$ is not set in integer~$x$.
\\item {\\tt E3D\\_$n$} --- {\\tt IFBITJMPREF $n$} ($x$ -- $x$), performs a {\\tt JMPREF} if bit $0\\leq n\\leq 31$ is set in integer~$x$.
\\item {\\tt E3F\\_$n$} --- {\\tt IFNBITJMPREF $n$} ($x$ -- $x$), performs a {\\tt JMPREF} if bit $0\\leq n\\leq 31$ is not set in integer~$x$.
\\end{itemize}

\\nxsubpoint\\emb{Control flow primitives: loops}
Most of the loop primitives listed below are implemented with the aid of extraordinary continuations, such as {\\tt ec\\_until} (cf.~\\ptref{sp:extraord.cont}), with the loop body and the original current continuation {\\tt cc} stored as the arguments to this extraordinary continuation. Typically a suitable extraordinary continuation is constructed, and then saved into the loop body continuation savelist as {\\tt c0}; after that, the modified loop body continuation is loaded into {\\tt cc} and executed in the usual fashion.
\\begin{itemize}
\\item {\\tt E4} --- {\\tt REPEAT} ($n$ $c$ -- ), executes continuation $c$ $n$ times, if integer $n$ is non-negative. If $n\\geq2^{31}$ or $n<-2^{31}$, generates a range check exception. Notice that a {\\tt RET} inside the code of $c$ works as a {\\tt continue}, not as a {\\tt break}. One should use either alternative (experimental) loops or alternative {\\tt RETALT} (along with a {\\tt SETEXITALT} before the loop) to {\\tt break} out of a loop.
\\item {\\tt E5} --- {\\tt REPEATEND} ($n$ -- ), similar to {\\tt REPEAT}, but it is applied to the current continuation {\\tt cc}. 
\\item {\\tt E6} --- {\\tt UNTIL} ($c$ -- ), executes continuation $c$, then pops an integer $x$ from the resulting stack. If $x$ is zero, performs another iteration of this loop. The actual implementation of this primitive involves an extraordinary continuation {\\tt ec\\_until} (cf.~\\ptref{sp:extraord.cont}) with its arguments set to the body of the loop (continuation $c$) and the original current continuation {\\tt cc}. This extraordinary continuation is then saved into the savelist of $c$ as $c.{\\tt c0}$ and the modified $c$ is then executed. The other loop primitives are implemented similarly with the aid of suitable extraordinary continuations.
\\item {\\tt E7} --- {\\tt UNTILEND} ( -- ), similar to {\\tt UNTIL}, but executes the current continuation {\\tt cc} in a loop. When the loop exit condition is satisfied, performs a {\\tt RET}.
\\item {\\tt E8} --- {\\tt WHILE} ($c'$ $c$ -- ), executes $c'$ and pops an integer $x$ from the resulting stack. If $x$ is zero, exists the loop and transfers control to the original {\\tt cc}. If $x$ is non-zero, executes $c$, and then begins a new iteration.
\\item {\\tt E9} --- {\\tt WHILEEND} ($c'$ -- ), similar to {\\tt WHILE}, but uses the current continuation {\\tt cc} as the loop body.
\\item {\\tt EA} --- {\\tt AGAIN} ($c$ -- ), similar to {\\tt REPEAT}, but executes $c$ infinitely many times. A {\\tt RET} only begins a new iteration of the infinite loop, which can be exited only by an exception, or a {\\tt RETALT} (or an explicit {\\tt JMPX}).
\\item {\\tt EB} --- {\\tt AGAINEND} ( -- ), similar to {\\tt AGAIN}, but performed with respect to the current continuation {\\tt cc}.
\\end{itemize}

\\nxsubpoint\\label{sp:cont.stk.manip}\\emb{Manipulating the stack of continuations}
\\begin{itemize}
\\item {\\tt EC$rn$} --- {\\tt SETCONTARGS $r$,$n$} ($x_1$ $x_2$\\dots$x_r$ $c$ -- $c'$), similar to {\\tt SETCONTARGS $r$}, but sets $c.{\\tt nargs}$ to the final size of the stack of $c'$ plus $n$. In other words, transforms $c$ into a {\\em closure\\/} or a {\\em partially applied function}, with $0\\leq n\\leq 14$ arguments missing.  
\\item {\\tt EC0$n$} --- {\\tt SETNUMARGS $n$} or {\\tt SETCONTARGS $0$,$n$} ($c$ -- $c'$), sets $c.{\\tt nargs}$ to $n$ plus the current depth of $c$'s stack, where $0\\leq n\\leq 14$. If $c.{\\tt nargs}$ is already set to a non-negative value, does nothing.
\\item {\\tt EC$r$F} --- {\\tt SETCONTARGS $r$} or {\\tt SETCONTARGS $r$,$-1$} ($x_1$ $x_2$\\dots$x_r$ $c$ -- $c'$), pushes $0\\leq r\\leq 15$ values $x_1\\ldots x_r$ into the stack of (a copy of) the continuation~$c$, starting with $x_1$. If the final depth of $c$'s stack turns out to be greater than $c.{\\tt nargs}$, a stack overflow exception is generated.
\\item {\\tt ED0$p$} --- {\\tt RETURNARGS $p$} ( -- ), leaves only the top $0\\leq p\\leq 15$ values in the current stack (somewhat similarly to {\\tt ONLYTOPX}), with all the unused bottom values not discarded, but saved into continuation {\\tt c0} in the same way as {\\tt SETCONTARGS} does.
\\item {\\tt ED10} --- {\\tt RETURNVARARGS} ($p$ -- ), similar to {\\tt RETURNARGS}, but with Integer $0\\leq p\\leq 255$ taken from the stack.
\\item {\\tt ED11} --- {\\tt SETCONTVARARGS} ($x_1$ $x_2$\\dots$x_r$ $c$ $r$ $n$ -- $c'$), similar to {\\tt SETCONTARGS}, but with $0\\leq r\\leq 255$ and $-1\\leq n\\leq 255$ taken from the stack.
\\item {\\tt ED12} --- {\\tt SETNUMVARARGS} ($c$ $n$ -- $c'$), where $-1\\leq n\\leq 255$. If $n=-1$, this operation does nothing ($c'=c$). Otherwise its action is similar to {\\tt SETNUMARGS $n$}, but with $n$ taken from the stack.
\\end{itemize}

\\nxsubpoint\\emb{Creating simple continuations and closures}\\label{sp:prim.bless.cont}
\\begin{itemize}
\\item {\\tt ED1E} --- {\\tt BLESS} ($s$ -- $c$), transforms a {\\em Slice} $s$ into a simple ordinary continuation $c$, with $c.{\\tt code}=s$ and an empty stack and savelist.
\\item {\\tt ED1F} --- {\\tt BLESSVARARGS} ($x_1$\\dots$x_r$ $s$ $r$ $n$ -- $c$), equivalent to {\\tt ROT}; {\\tt BLESS}; {\\tt ROTREV}; {\\tt SETCONTVARARGS}.
\\item {\\tt EE$rn$} --- {\\tt BLESSARGS $r,n$} ($x_1$\\dots$x_r$ $s$ -- $c$), where $0\\leq r\\leq 15$, $-1\\leq n\\leq 14$, equivalent to {\\tt BLESS}; {\\tt SETCONTARGS $r,n$}. The value of $n$ is represented inside the instruction by the 4-bit integer $n\\bmod16$.
\\item {\\tt EE0$n$} --- {\\tt BLESSNUMARGS $n$} or {\\tt BLESSARGS 0,$n$} ($s$ -- $c$), also transforms a {\\em Slice\\/} $s$ into a {\\em Continuation\\/} $c$, but sets $c.{\\tt nargs}$ to $0\\leq n\\leq 14$.
\\end{itemize}

\\nxsubpoint\\emb{Operations with continuation savelists and control registers}
\\begin{itemize}
\\item {\\tt ED4$i$} --- {\\tt PUSH c$(i)$} or {\\tt PUSHCTR c$(i)$} ( -- $x$), pushes the current value of control register {\\tt c$(i)$}. If the control register is not supported in the current codepage, or if it does not have a value, an exception is triggered.
\\item {\\tt ED44} --- {\\tt PUSH c4} or {\\tt PUSHROOT}, pushes the \`\`global data root'' cell reference, thus enabling access to persistent smart-contract data.
\\item {\\tt ED5$i$} --- {\\tt POP c$(i)$} or {\\tt POPCTR c$(i)$} ($x$ -- ), pops a value $x$ from the stack and stores it into control register {\\tt c$(i)$}, if supported in the current codepage. Notice that if a control register accepts only values of a specific type, a type-checking exception may occur.
\\item {\\tt ED54} --- {\\tt POP c4} or {\\tt POPROOT}, sets the \`\`global data root'' cell reference, thus allowing modification of persistent smart-contract data.
\\item {\\tt ED6$i$} --- {\\tt SETCONT c$(i)$} or {\\tt SETCONTCTR c$(i)$} ($x$ $c$ -- $c'$), stores $x$ into the savelist of continuation $c$ as {\\tt c$(i)$}, and returns the resulting continuation $c'$. Almost all operations with continuations may be expressed in terms of {\\tt SETCONTCTR}, {\\tt POPCTR}, and {\\tt PUSHCTR}.
\\item {\\tt ED7$i$} --- {\\tt SETRETCTR c$(i)$} ($x$ -- ), equivalent to {\\tt PUSH c0}; {\\tt SETCONTCTR c$(i)$}; {\\tt POP c0}.
\\item {\\tt ED8$i$} --- {\\tt SETALTCTR c$(i)$} ($x$ -- ), equivalent to {\\tt PUSH c1}; {\\tt SETCONTCTR c$(i)$}; {\\tt POP c0}.
\\item {\\tt ED9$i$} --- {\\tt POPSAVE c$(i)$} or {\\tt POPCTRSAVE c$(i)$} ($x$ --), similar to {\\tt POP c$(i)$}, but also saves the old value of {\\tt c$(i)$} into continuation {\\tt c0}. Equivalent (up to exceptions) to {\\tt SAVECTR c$(i)$}; {\\tt POP c$(i)$}.
\\item {\\tt EDA$i$} --- {\\tt SAVE c$(i)$} or {\\tt SAVECTR c$(i)$} ( -- ), saves the current value of {\\tt c$(i)$} into the savelist of continuation {\\tt c0}. If an entry for {\\tt c$(i)$} is already present in the savelist of {\\tt c0}, nothing is done. Equivalent to {\\tt PUSH c$(i)$}; {\\tt SETRETCTR $c(i)$}.
\\item {\\tt EDB$i$} --- {\\tt SAVEALT c$(i)$} or {\\tt SAVEALTCTR c$(i)$} ( -- ), similar to {\\tt SAVE c$(i)$}, but saves the current value of {\\tt c$(i)$} into the savelist of {\\tt c1}, not {\\tt c0}.
\\item {\\tt EDC$i$} --- {\\tt SAVEBOTH c$(i)$} or {\\tt SAVEBOTHCTR c$(i)$} ( -- ), equivalent to {\\tt DUP}; {\\tt SAVE c$(i)$}; {\\tt SAVEALT c$(i)$}.
\\item {\\tt EDE0} --- {\\tt PUSHCTRX} ($i$ -- $x$), similar to {\\tt PUSHCTR c$(i)$}, but with $i$, $0\\leq i\\leq255$, taken from the stack. Notice that this primitive is one of the few \`\`exotic'' primitives, which are not polymorphic like stack manipulation primitives, and at the same time do not have well-defined types of parameters and return values, because the type of $x$ depends on $i$.
\\item {\\tt EDE1} --- {\\tt POPCTRX} ($x$ $i$ -- ), similar to {\\tt POPCTR c$(i)$}, but with $0\\leq i\\leq255$ from the stack.
\\item {\\tt EDE2} --- {\\tt SETCONTCTRX} ($x$ $c$ $i$ -- $c'$), similar to {\\tt SETCONTCTR c$(i)$}, but with $0\\leq i\\leq 255$ from the stack.
\\item {\\tt EDF0} --- {\\tt COMPOS} or {\\tt BOOLAND} ($c$ $c'$ -- $c''$), computes the composition $c\\circ_0c'$, which has the meaning of \`\`perform $c$, and, if successful, perform $c'$'' (if $c$ is a boolean circuit) or simply \`\`perform $c$, then $c'$''. Equivalent to {\\tt SWAP}; {\\tt SETCONT c0}.
\\item {\\tt EDF1} --- {\\tt COMPOSALT} or {\\tt BOOLOR} ($c$ $c'$ -- $c''$), computes the alternative composition $c\\circ_1 c'$, which has the meaning of \`\`perform $c$, and, if not successful, perform $c'$'' (if $c$ is a boolean circuit). Equivalent to {\\tt SWAP}; {\\tt SETCONT c1}.
\\item {\\tt EDF2} --- {\\tt COMPOSBOTH} ($c$ $c'$ -- $c''$), computes $(c\\circ_0c')\\circ_1c'$, which has the meaning of \`\`compute boolean circuit $c$, then compute $c'$, regardless of the result of $c$''.
\\item {\\tt EDF3} --- {\\tt ATEXIT} ($c$ -- ), sets \${\\tt c0}\\leftarrow c\\circ_0{\\tt c0}$. In other words, $c$ will be executed before exiting current subroutine.
\\item {\\tt EDF4} --- {\\tt ATEXITALT} ($c$ -- ), sets \${\\tt c1}\\leftarrow c\\circ_1{\\tt c1}$. In other words, $c$ will be executed before exiting current subroutine by its alternative return path.
\\item {\\tt EDF5} --- {\\tt SETEXITALT} ($c$ -- ), sets \${\\tt c1}\\leftarrow (c\\circ_0{\\tt c0})\\circ_1{\\tt c1}$. In this way, a subsequent {\\tt RETALT} will first execute $c$, then transfer control to the original {\\tt c0}. This can be used, for instance, to exit from nested loops.
\\item {\\tt EDF6} --- {\\tt THENRET} ($c$ -- $c'$), computes $c':=c\\circ_0{\\tt c0}$
\\item {\\tt EDF7} --- {\\tt THENRETALT} ($c$ -- $c'$), computes $c':=c\\circ_0{\\tt c1}$
\\item {\\tt EDF8} --- {\\tt INVERT} ( -- ), interchanges {\\tt c0} and {\\tt c1}.
\\item {\\tt EDF9} --- {\\tt BOOLEVAL} ($c$ -- $?$), performs \${\\tt cc}\\leftarrow \\bigl(c\\circ_0(({\\tt PUSH}\\,-1)\\circ_0{\\tt cc})\\bigr)\\circ_1(({\\tt PUSH}\\,0)\\circ_0{\\tt cc})$. If $c$ represents a boolean circuit, the net effect is to evaluate it and push either $-1$ or $0$ into the stack before continuing. 
\\item {\\tt EE$rn$} --- {\\tt BLESSARGS $r,n$} ($x_1$\\dots$x_r$ $s$ -- $c$), described in~\\ptref{sp:cont.stk.manip}.
\\end{itemize}

\\nxsubpoint\\emb{Dictionary subroutine calls and jumps}\\label{sp:prim.dict.calls}
\\begin{itemize}
\\item {\\tt F0$n$} --- {\\tt CALL $n$} or {\\tt CALLDICT $n$} ( -- $n$), calls the continuation in {\\tt c3}, pushing integer $0\\leq n\\leq 255$ into its stack as an argument. Approximately equivalent to {\\tt PUSHINT $n$}; {\\tt PUSH c3}; {\\tt EXECUTE}.
\\item {\\tt F12\\_$n$} --- {\\tt CALL $n$} for $0\\leq n<2^{14}$ ( -- $n$), an encoding of {\\tt CALL $n$} for larger values of $n$.
\\item {\\tt F16\\_$n$} --- {\\tt JMP $n$} or {\\tt JMPDICT $n$} ( -- $n$), jumps to the continuation in {\\tt c3}, pushing integer $0\\leq n<2^{14}$ as its argument. Approximately equivalent to {\\tt PUSHINT $n$}; {\\tt PUSH c3}; {\\tt JMPX}.
\\item {\\tt F1A\\_$n$} --- {\\tt PREPARE $n$} or {\\tt PREPAREDICT $n$} ( -- $n$ $c$), equivalent to {\\tt PUSHINT $n$}; {\\tt PUSH c3}, for $0\\leq n<2^{14}$. In this way, {\\tt CALL $n$} is approximately equivalent to {\\tt PREPARE $n$}; {\\tt EXECUTE}, and {\\tt JMP $n$} is approximately equivalent to {\\tt PREPARE $n$}; {\\tt JMPX}. One might use, for instance, {\\tt CALLARGS} or {\\tt CALLCC} instead of {\\tt EXECUTE} here.
\\end{itemize}

\\mysubsection{Exception generating and handling primitives}

\\nxsubpoint\\emb{Throwing exceptions}
\\begin{itemize}
\\item {\\tt F22\\_$nn$} --- {\\tt THROW $nn$} ( -- $0$ $nn$), throws exception $0\\leq nn\\leq 63$ with parameter zero. In other words, it transfers control to the continuation in {\\tt c2}, pushing $0$ and $nn$ into its stack, and discarding the old stack altogether.
\\item {\\tt F26\\_$nn$} --- {\\tt THROWIF $nn$} ($f$ -- ), throws exception $0\\leq nn\\leq 63$ with  parameter zero only if integer $f\\neq0$.
\\item {\\tt F2A\\_$nn$} --- {\\tt THROWIFNOT $nn$} ($f$ -- ), throws exception $0\\leq nn\\leq 63$ with parameter zero only if integer $f=0$.
\\item {\\tt F2C4\\_$nn$} --- {\\tt THROW $nn$} for $0\\leq nn<2^{11}$, an encoding of {\\tt THROW $nn$} for larger values of $nn$.
\\item {\\tt F2CC\\_$nn$} --- {\\tt THROWARG $nn$} ($x$ -- $x$ $nn$), throws exception $0\\leq nn<2^{11}$ with parameter $x$, by copying $x$ and $nn$ into the stack of \${\\tt c2}$ and transferring control to {\\tt c2}.
\\item {\\tt F2D4\\_$nn$} --- {\\tt THROWIF $nn$} ($f$ -- ) for $0\\leq nn<2^{11}$.
\\item {\\tt F2DC\\_$nn$} --- {\\tt THROWARGIF $nn$} ($x$ $f$ -- ), throws exception $0\\leq nn<2^{11}$ with parameter $x$ only if integer $f\\neq0$.
\\item {\\tt F2E4\\_$nn$} --- {\\tt THROWIFNOT $nn$} ($f$ -- ) for $0\\leq nn<2^{11}$.
\\item {\\tt F2EC\\_$nn$} --- {\\tt THROWARGIFNOT $nn$} ($x$ $f$ -- ), throws exception $0\\leq nn<2^{11}$ with parameter $x$ only if integer $f=0$.
\\item {\\tt F2F0} --- {\\tt THROWANY} ($n$ -- $0$ $n$), throws exception $0\\leq n<2^{16}$ with parameter zero. Approximately equivalent to {\\tt PUSHINT 0}; {\\tt SWAP}; {\\tt THROWARGANY}.
\\item {\\tt F2F1} --- {\\tt THROWARGANY} ($x$ $n$ -- $x$ $n$), throws exception $0\\leq n<2^{16}$ with parameter $x$, transferring control to the continuation in {\\tt c2}. Approximately equivalent to {\\tt PUSH c2}; {\\tt JMPXARGS 2}.
\\item {\\tt F2F2} --- {\\tt THROWANYIF} ($n$ $f$ -- ), throws exception $0\\leq n<2^{16}$ with parameter zero only if $f\\neq0$.
\\item {\\tt F2F3} --- {\\tt THROWARGANYIF} ($x$ $n$ $f$ -- ), throws exception $0\\leq n<2^{16}$ with parameter $x$ only if $f\\neq0$.
\\item {\\tt F2F4} --- {\\tt THROWANYIFNOT} ($n$ $f$ -- ), throws exception $0\\leq n<2^{16}$ with parameter zero only if $f=0$.
\\item {\\tt F2F5} --- {\\tt THROWARGANYIFNOT} ($x$ $n$ $f$ -- ), throws exception $0\\leq n<2^{16}$ with parameter $x$ only if $f=0$.
\\end{itemize}

\\nxsubpoint\\emb{Catching and handling exceptions}
\\begin{itemize}
\\item {\\tt F2FF} --- {\\tt TRY} ($c$ $c'$ -- ), sets {\\tt c2} to $c'$, first saving the old value of {\\tt c2} both into the savelist of $c'$ and into the savelist of the current continuation, which is stored into $c.{\\tt c0}$ and $c'.{\\tt c0}$. Then runs $c$ similarly to {\\tt EXECUTE}. If $c$ does not throw any exceptions, the original value of {\\tt c2} is automatically restored on return from $c$. If an exception occurs, the execution is transferred to $c'$, but the original value of {\\tt c2} is restored in the process, so that $c'$ can re-throw the exception by {\\tt THROWANY} if it cannot handle it by itself.
\\item {\\tt F3$pr$} --- {\\tt TRYARGS $p$,$r$} ($c$ $c'$ -- ), similar to {\\tt TRY}, but with {\\tt CALLARGS $p$,$r$} internally used instead of {\\tt EXECUTE}. In this way, all but the top $0\\leq p\\leq 15$ stack elements will be saved into current continuation's stack, and then restored upon return from either $c$ or $c'$, with the top $0\\leq r\\leq 15$ values of the resulting stack of $c$ or $c'$ copied as return values.
\\end{itemize}

\\mysubsection{Dictionary manipulation primitives}\\label{p:prim.dict}

TVM's dictionary support is discussed at length in~\\ptref{p:hashmaps}. The basic operations with dictionaries are listed in~\\ptref{sp:dict.ops}, while the taxonomy of dictionary manipulation primitives is provided in~\\ptref{sp:dict.prim.taxonomy}. Here we use the concepts and notation introduced in those sections.

Dictionaries admit two different representations as TVM stack values:
\\begin{itemize}
\\item A {\\em Slice\\/}~$s$ with a serialization of a TL-B value of type $\\HashmapE(n,X)$. In other words, $s$ consists either of one bit equal to zero (if the dictionary is empty), or of one bit equal to one and a reference to a {\\em Cell\\/} containing the root of the binary tree, i.e., a serialized value of type $\\Hashmap(n,X)$.
\\item A \`\`maybe {\\em Cell\\/}'' $c^?$, i.e., a value that is either a {\\em Cell\\/} (containing a serialized value of type $\\Hashmap(n,X)$ as before) or a {\\em Null\\/} (corresponding to an empty dictionary). When a \`\`maybe {\\em Cell\\/}'' $c^?$ is used to represent a dictionary, we usually denote it by $D$ in the stack notation.
\\end{itemize}
Most of the dictionary primitives listed below accept and return dictionaries in the second form, which is more convenient for stack manipulation. However, serialized dictionaries inside larger TL-B objects use the first representation.

Opcodes starting with {\\tt F4} and {\\tt F5} are reserved for dictionary operations.

\\nxsubpoint\\label{sp:prim.dict.create}\\emb{Dictionary creation}
\\begin{itemize}
\\item {\\tt 6D} --- {\\tt NEWDICT} ( -- $D$), returns a new empty dictionary. It is an alternative mnemonics for {\\tt PUSHNULL}, cf.~\\ptref{sp:null.ops}.
\\item {\\tt 6E} --- {\\tt DICTEMPTY} ($D$ -- $?$), checks whether dictionary $D$ is empty, and returns $-1$ or $0$ accordingly. It is an alternative mnemonics for {\\tt ISNULL}, cf.~\\ptref{sp:null.ops}.
\\end{itemize}

\\nxsubpoint\\emb{Dictionary serialization and deserialization}
\\begin{itemize}
\\item {\\tt CE} --- {\\tt STDICTS} ($s$ $b$ -- $b'$), stores a {\\em Slice\\/}-represented dictionary~$s$ into {\\em Builder\\/}~$b$. It is actually a synonym for {\\tt STSLICE}.
\\item {\\tt F400} --- {\\tt STDICT} or {\\tt STOPTREF} ($D$ $b$ -- $b'$), stores dictionary $D$ into {\\em Builder\\/} $b$, returing the resulting {\\em Builder\\/} $b'$. In other words, if $D$ is a cell, performs {\\tt STONE} and {\\tt STREF}; if $D$ is {\\em Null}, performs {\\tt NIP} and {\\tt STZERO}; otherwise throws a type checking exception.
\\item {\\tt F401} --- {\\tt SKIPDICT} or {\\tt SKIPOPTREF} ($s$ -- $s'$), equivalent to {\\tt LDDICT}; {\\tt NIP}.
\\item {\\tt F402} --- {\\tt LDDICTS} ($s$ -- $s'$ $s''$), loads (parses) a ({\\em Slice\\/}-represented) dictionary $s'$ from {\\em Slice\\/}~$s$, and returns the remainder of~$s$ as $s''$. This is a \`\`split function'' for all $\\HashmapE(n,X)$ dictionary types.
\\item {\\tt F403} --- {\\tt PLDDICTS} ($s$ -- $s'$), preloads a ({\\em Slice\\/}-represented) dictionary $s'$ from {\\em Slice\\/}~$s$. Approximately equivalent to {\\tt LDDICTS}; {\\tt DROP}.
\\item {\\tt F404} --- {\\tt LDDICT} or {\\tt LDOPTREF} ($s$ -- $D$ $s'$), loads (parses) a dictionary $D$ from {\\em Slice\\/}~$s$, and returns the remainder of~$s$ as $s'$. May be applied to dictionaries or to values of arbitrary $(\\texttt{\\caret}Y)^?$ types.
\\item {\\tt F405} --- {\\tt PLDDICT} or {\\tt PLDOPTREF} ($s$ -- $D$), preloads a dictionary $D$ from {\\em Slice\\/}~$s$. Approximately equivalent to {\\tt LDDICT}; {\\tt DROP}.
\\item {\\tt F406} --- {\\tt LDDICTQ} ($s$ -- $D$ $s'$ $-1$ or $s$ $0$), a quiet version of {\\tt LDDICT}.
\\item {\\tt F407} --- {\\tt PLDDICTQ} ($s$ -- $D$ $-1$ or $0$), a quiet version of {\\tt PLDDICT}.
\\end{itemize}

\\nxsubpoint\\label{sp:prim.dict.get}\\emb{{\\sc Get} dictionary operations}
\\begin{itemize}
\\item {\\tt F40A} --- {\\tt DICTGET} ($k$ $D$ $n$ -- $x$ $-1$ or $0$), looks up key $k$ (represented by a {\\em Slice}, the first $0\\leq n\\leq 1023$ data bits of which are used as a key) in dictionary $D$ of type $\\HashmapE(n,X)$ with $n$-bit keys. On success, returns the value found as a {\\em Slice}~$x$.
\\item {\\tt F40B} --- {\\tt DICTGETREF} ($k$ $D$ $n$ -- $c$ $-1$ or $0$), similar to {\\tt DICTGET}, but with a {\\tt LDREF}; {\\tt ENDS} applied to $x$ on success. This operation is useful for dictionaries of type $\\HashmapE(n,\\texttt{\\caret}Y)$.
\\item {\\tt F40C} --- {\\tt DICTIGET} ($i$ $D$ $n$ -- $x$ $-1$ or $0$), similar to {\\tt DICTGET}, but with a signed (big-endian) $n$-bit {\\em Integer\\/} $i$ as a key. If $i$ does not fit into $n$ bits, returns $0$. If $i$ is a {\\tt NaN}, throws an integer overflow exception.
\\item {\\tt F40D} --- {\\tt DICTIGETREF} ($i$ $D$ $n$ -- $c$ $-1$ or $0$), combines {\\tt DICTIGET} with {\\tt DICTGETREF}: it uses signed $n$-bit {\\em Integer\\/} $i$ as a key and returns a {\\em Cell\\/} instead of a {\\em Slice\\/} on success.
\\item {\\tt F40E} --- {\\tt DICTUGET} ($i$ $D$ $n$ -- $x$ $-1$ or $0$), similar to {\\tt DICTIGET}, but with {\\em unsigned\\/} (big-endian) $n$-bit {\\em Integer\\/} $i$ used as a key.
\\item {\\tt F40F} --- {\\tt DICTUGETREF} ($i$ $D$ $n$ -- $c$ $-1$ or $0$), similar to {\\tt DICTIGETREF}, but with an unsigned $n$-bit {\\em Integer\\/} key $i$.
\\end{itemize}

\\nxsubpoint\\label{sp:prim.dict.set}\\emb{{\\sc Set}/{\\sc Replace}/{\\sc Add} dictionary operations}
The mnemonics of the following dictionary primitives are constructed in a systematic fashion according to the regular expression $\\texttt{DICT}[,\\texttt{I},\\texttt{U}](\\texttt{SET},\\texttt{REPLACE},\\texttt{ADD})[\\texttt{GET}][\\texttt{REF}]$ depending on the type of the key used (a {\\em Slice\\/} or a signed or unsigned {\\em Integer\\/}), the dictionary operation to be performed, and the way the values are accepted and returned (as {\\em Cell\\/}s or as {\\em Slice\\/}s). Therefore, we provide a detailed description only for some primitives, assuming that this information is sufficient for the reader to understand the precise action of the remaining primitives.
\\begin{itemize}
\\item {\\tt F412} --- {\\tt DICTSET} ($x$ $k$ $D$ $n$ -- $D'$), sets the value associated with $n$-bit key $k$ (represented by a {\\em Slice} as in {\\tt DICTGET}) in dictionary $D$ (also represented by a {\\em Slice}) to value $x$ (again a {\\em Slice}), and returns the resulting dictionary as $D'$.
\\item {\\tt F413} --- {\\tt DICTSETREF} ($c$ $k$ $D$ $n$ -- $D'$), similar to {\\tt DICTSET}, but with the value set to a reference to {\\em Cell}~$c$.
\\item {\\tt F414} --- {\\tt DICTISET} ($x$ $i$ $D$ $n$ -- $D'$), similar to {\\tt DICTSET}, but with the key represented by a (big-endian) signed $n$-bit integer $i$. If $i$ does not fit into $n$ bits, a range check exception is generated.
\\item {\\tt F415} --- {\\tt DICTISETREF} ($c$ $i$ $D$ $n$ -- $D'$), similar to {\\tt DICTSETREF}, but with the key a signed $n$-bit integer as in {\\tt DICTISET}.
\\item {\\tt F416} --- {\\tt DICTUSET} ($x$ $i$ $D$ $n$ -- $D'$), similar to {\\tt DICTISET}, but with $i$ an {\\em unsigned\\/} $n$-bit integer.
\\item {\\tt F417} --- {\\tt DICTUSETREF} ($c$ $i$ $D$ $n$ -- $D'$), similar to {\\tt DICTISETREF}, but with $i$ unsigned.
\\item {\\tt F41A} --- {\\tt DICTSETGET} ($x$ $k$ $D$ $n$ -- $D'$ $y$ $-1$ or $D'$ $0$), combines {\\tt DICTSET} with {\\tt DICTGET}: it sets the value corresponding to key~$k$ to~$x$, but also returns the old value~$y$ associated with the key in question, if present.
\\item {\\tt F41B} --- {\\tt DICTSETGETREF} ($c$ $k$ $D$ $n$ -- $D'$ $c'$ $-1$ or $D'$ $0$), combines {\\tt DICTSETREF} with {\\tt DICTGETREF} similarly to {\\tt DICTSETGET}.
\\item {\\tt F41C} --- {\\tt DICTISETGET} ($x$ $i$ $D$ $n$ -- $D'$ $y$ $-1$ or $D'$ $0$), similar to {\\tt DICTSETGET}, but with the key represented by a big-endian signed $n$-bit {\\em Integer\\/}~$i$.
\\item {\\tt F41D} --- {\\tt DICTISETGETREF} ($c$ $i$ $D$ $n$ -- $D'$ $c'$ $-1$ or $D'$ $0$), a version of {\\tt DICTSETGETREF} with signed {\\em Integer}~$i$ as a key.
\\item {\\tt F41E} --- {\\tt DICTUSETGET} ($x$ $i$ $D$ $n$ -- $D'$ $y$ $-1$ or $D'$ $0$), similar to {\\tt DICTISETGET}, but with $i$ an unsigned $n$-bit integer.
\\item {\\tt F41F} --- {\\tt DICTUSETGETREF} ($c$ $i$ $D$ $n$ -- $D'$ $c'$ $-1$ or $D'$ $0$).
\\item {\\tt F422} --- {\\tt DICTREPLACE} ($x$ $k$ $D$ $n$ -- $D'$ $-1$ or  $D$ $0$), a {\\sc Replace} operation, which is similar to {\\tt DICTSET}, but sets the value of key $k$ in dictionary $D$ to $x$ only if the key $k$ was already present in $D$.
\\item {\\tt F423} --- {\\tt DICTREPLACEREF} ($c$ $k$ $D$ $n$ -- $D'$ $-1$ or $D$ $0$), a {\\sc Replace} counterpart of {\\tt DICTSETREF}.
\\item {\\tt F424} --- {\\tt DICTIREPLACE} ($x$ $i$ $D$ $n$ -- $D'$ $-1$ or $D$ $0$), a version of {\\tt DICTREPLACE} with signed $n$-bit {\\em Integer}~$i$ used as a key.
\\item {\\tt F425} --- {\\tt DICTIREPLACEREF} ($c$ $i$ $D$ $n$ -- $D'$ $-1$ or $D$ $0$).
\\item {\\tt F426} --- {\\tt DICTUREPLACE} ($x$ $i$ $D$ $n$ -- $D'$ $-1$ or $D$ $0$).
\\item {\\tt F427} --- {\\tt DICTUREPLACEREF} ($c$ $i$ $D$ $n$ -- $D'$ $-1$ or $D$ $0$).
\\item {\\tt F42A} --- {\\tt DICTREPLACEGET} ($x$ $k$ $D$ $n$ -- $D'$ $y$ $-1$ or $D$ $0$), a {\\sc Replace} counterpart of {\\tt DICTSETGET}: on success, also returns the old value associated with the key in question.
\\item {\\tt F42B} --- {\\tt DICTREPLACEGETREF} ($c$ $k$ $D$ $n$ -- $D'$ $c'$ $-1$ or $D$ $0$).
\\item {\\tt F42C} --- {\\tt DICTIREPLACEGET} ($x$ $i$ $D$ $n$ -- $D'$ $y$ $-1$ or $D$ $0$).
\\item {\\tt F42D} --- {\\tt DICTIREPLACEGETREF} ($c$ $i$ $D$ $n$ -- $D'$ $c'$ $-1$ or $D$ $0$).
\\item {\\tt F42E} --- {\\tt DICTUREPLACEGET} ($x$ $i$ $D$ $n$ -- $D'$ $y$ $-1$ or $D$ $0$).
\\item {\\tt F42F} --- {\\tt DICTUREPLACEGETREF} ($c$ $i$ $D$ $n$ -- $D'$ $c'$ $-1$ or $D$ $0$).
\\item {\\tt F432} --- {\\tt DICTADD} ($x$ $k$ $D$ $n$ -- $D'$ $-1$ or $D$ $0$), an {\\sc Add} counterpart of {\\tt DICTSET}: sets the value associated with key $k$ in dictionary $D$ to $x$, but only if it is not already present in $D$.
\\item {\\tt F433} --- {\\tt DICTADDREF} ($c$ $k$ $D$ $n$ -- $D'$ $-1$ or $D$ $0$).
\\item {\\tt F434} --- {\\tt DICTIADD} ($x$ $i$ $D$ $n$ -- $D'$ $-1$ or $D$ $0$).
\\item {\\tt F435} --- {\\tt DICTIADDREF} ($c$ $i$ $D$ $n$ -- $D'$ $-1$ or $D$ $0$).
\\item {\\tt F436} --- {\\tt DICTUADD} ($x$ $i$ $D$ $n$ -- $D'$ $-1$ or $D$ $0$).
\\item {\\tt F437} --- {\\tt DICTUADDREF} ($c$ $i$ $D$ $n$ -- $D'$ $-1$ or $D$ $0$).
\\item {\\tt F43A} --- {\\tt DICTADDGET} ($x$ $k$ $D$ $n$ -- $D'$ $-1$ or $D$ $y$ $0$), an {\\sc Add} counterpart of {\\tt DICTSETGET}: sets the value associated with key $k$ in dictionary $D$ to $x$, but only if key $k$ is not already present in $D$. Otherwise, just returns the old value $y$ without changing the dictionary.
\\item {\\tt F43B} --- {\\tt DICTADDGETREF} ($c$ $k$ $D$ $n$ -- $D'$ $-1$ or $D$ $c'$ $0$), an {\\sc Add} counterpart of {\\tt DICTSETGETREF}.
\\item {\\tt F43C} --- {\\tt DICTIADDGET} ($x$ $i$ $D$ $n$ -- $D'$ $-1$ or $D$ $y$ $0$).
\\item {\\tt F43D} --- {\\tt DICTIADDGETREF} ($c$ $i$ $D$ $n$ -- $D'$ $-1$ or $D$ $c'$ $0$).
\\item {\\tt F43E} --- {\\tt DICTUADDGET} ($x$ $i$ $D$ $n$ -- $D'$ $-1$ or $D$ $y$ $0$).
\\item {\\tt F43F} --- {\\tt DICTUADDGETREF} ($c$ $i$ $D$ $n$ -- $D'$ $-1$ or $D$ $c'$ $0$).
\\end{itemize}

\\nxsubpoint\\label{sp:prim.dict.set.builder}\\emb{Builder-accepting variants of {\\sc Set} dictionary operations}
The following primitives accept the new value as a {\\em Builder}~$b$ instead of a {\\em Slice}~$x$, which often is more convenient if the value needs to be serialized from several components computed in the stack. (This is reflected by appending a {\\tt B} to the mnemonics of the corresponding {\\sc Set} primitives that work with {\\em Slice\\/}s.) The net effect is roughly equivalent to converting $b$ into a {\\em Slice\\/} by {\\tt ENDC}; {\\tt CTOS} and executing the corresponding primitive listed in~\\ptref{sp:prim.dict.set}.
\\begin{itemize}
\\item {\\tt F441} --- {\\tt DICTSETB} ($b$ $k$ $D$ $n$ -- $D'$).
\\item {\\tt F442} --- {\\tt DICTISETB} ($b$ $i$ $D$ $n$ -- $D'$).
\\item {\\tt F443} --- {\\tt DICTUSETB} ($b$ $i$ $D$ $n$ -- $D'$).
\\item {\\tt F445} --- {\\tt DICTSETGETB} ($b$ $k$ $D$ $n$ -- $D'$ $y$ $-1$ or $D'$ $0$).
\\item {\\tt F446} --- {\\tt DICTISETGETB} ($b$ $i$ $D$ $n$ -- $D'$ $y$ $-1$ or $D'$ $0$).
\\item {\\tt F447} --- {\\tt DICTUSETGETB} ($b$ $i$ $D$ $n$ -- $D'$ $y$ $-1$ or $D'$ $0$).
\\item {\\tt F449} --- {\\tt DICTREPLACEB} ($b$ $k$ $D$ $n$ -- $D'$ $-1$ or $D$ $0$).
\\item {\\tt F44A} --- {\\tt DICTIREPLACEB} ($b$ $i$ $D$ $n$ -- $D'$ $-1$ or $D$ $0$).
\\item {\\tt F44B} --- {\\tt DICTUREPLACEB} ($b$ $i$ $D$ $n$ -- $D'$ $-1$ or $D$ $0$).
\\item {\\tt F44D} --- {\\tt DICTREPLACEGETB} ($b$ $k$ $D$ $n$ -- $D'$ $y$ $-1$ or $D$ $0$).
\\item {\\tt F44E} --- {\\tt DICTIREPLACEGETB} ($b$ $i$ $D$ $n$ -- $D'$ $y$ $-1$ or $D$ $0$).
\\item {\\tt F44F} --- {\\tt DICTUREPLACEGETB} ($b$ $i$ $D$ $n$ -- $D'$ $y$ $-1$ or $D$ $0$).
\\item {\\tt F451} --- {\\tt DICTADDB} ($b$ $k$ $D$ $n$ -- $D'$ $-1$ or $D$ $0$).
\\item {\\tt F452} --- {\\tt DICTIADDB} ($b$ $i$ $D$ $n$ -- $D'$ $-1$ or $D$ $0$).
\\item {\\tt F453} --- {\\tt DICTUADDB} ($b$ $i$ $D$ $n$ -- $D'$ $-1$ or $D$ $0$).
\\item {\\tt F455} --- {\\tt DICTADDGETB} ($b$ $k$ $D$ $n$ -- $D'$ $-1$ or $D$ $y$ $0$).
\\item {\\tt F456} --- {\\tt DICTIADDGETB} ($b$ $i$ $D$ $n$ -- $D'$ $-1$ or $D$ $y$ $0$).
\\item {\\tt F457} --- {\\tt DICTUADDGETB} ($b$ $i$ $D$ $n$ -- $D'$ $-1$ or $D$ $y$ $0$).
\\end{itemize}

\\nxsubpoint\\label{sp:prim.dict.delete}\\emb{\\textsc{Delete} dictionary operations}
\\begin{itemize}
\\item {\\tt F459} --- {\\tt DICTDEL} ($k$ $D$ $n$ -- $D'$ $-1$ or $D$ $0$), deletes $n$-bit key, represented by a {\\em Slice}~$k$, from dictionary $D$. If the key is present, returns the modified dictionary $D'$ and the success flag~$-1$. Otherwise, returns the original dictionary $D$ and $0$.
\\item {\\tt F45A} --- {\\tt DICTIDEL} ($i$ $D$ $n$ -- $D'$ $?$), a version of {\\tt DICTDEL} with the key represented by a signed $n$-bit {\\em Integer}~$i$. If $i$ does not fit into $n$ bits, simply returns $D$ $0$ (\`\`key not found, dictionary unmodified'').
\\item {\\tt F45B} --- {\\tt DICTUDEL} ($i$ $D$ $n$ -- $D'$ $?$), similar to {\\tt DICTIDEL}, but with $i$ an unsigned $n$-bit integer.
\\item {\\tt F462} --- {\\tt DICTDELGET} ($k$ $D$ $n$ -- $D'$ $x$ $-1$ or $D$ $0$), deletes $n$-bit key, represented by a {\\em Slice}~$k$, from dictionary $D$. If the key is present, returns the modified dictionary $D'$, the original value~$x$ associated with the key~$k$ (represented by a {\\em Slice}), and the success flag~$-1$. Otherwise, returns the original dictionary $D$ and $0$.
\\item {\\tt F463} --- {\\tt DICTDELGETREF} ($k$ $D$ $n$ -- $D'$ $c$ $-1$ or $D$ $0$), similar to {\\tt DICTDELGET}, but with {\\tt LDREF}; {\\tt ENDS} applied to $x$ on success, so that the value returned~$c$ is a {\\em Cell}.
\\item {\\tt F464} --- {\\tt DICTIDELGET} ($i$ $D$ $n$ -- $D'$ $x$ $-1$ or $D$ $0$), a variant of primitive {\\tt DICTDELGET} with signed $n$-bit integer~$i$ as a key.
\\item {\\tt F465} --- {\\tt DICTIDELGETREF} ($i$ $D$ $n$ -- $D'$ $c$ $-1$ or $D$ $0$), a variant of primitive {\\tt DICTIDELGET} returning a {\\em Cell\\/} instead of a {\\em Slice.}
\\item {\\tt F466} --- {\\tt DICTUDELGET} ($i$ $D$ $n$ -- $D'$ $x$ $-1$ or $D$ $0$), a variant of primitive {\\tt DICTDELGET} with unsigned $n$-bit integer~$i$ as a key.
\\item {\\tt F467} --- {\\tt DICTUDELGETREF} ($i$ $D$ $n$ -- $D'$ $c$ $-1$ or $D$ $0$), a variant of primitive {\\tt DICTUDELGET} returning a {\\em Cell\\/} instead of a {\\em Slice.}
\\end{itemize}

\\nxsubpoint\\emb{\`\`Maybe reference'' dictionary operations}
The following operations assume that a dictionary is used to store values~$c^?$ of type $\\textit{Cell\\/}^?$ (\`\`{\\em Maybe Cell\\/}''), which can be used in particular to store dictionaries as values in other dictionaries. The representation is as follows: if $c^?$ is a {\\em Cell\\/}, it is stored as a value with no data bits and exactly one reference to this {\\em Cell}. If $c^?$ is {\\em Null}, then the corresponding key must be absent from the dictionary altogether.
\\begin{itemize}
\\item {\\tt F469} --- {\\tt DICTGETOPTREF} ($k$ $D$ $n$ -- $c^?$), a variant of {\\tt DICTGETREF} that returns {\\em Null\\/} instead of the value $c^?$ if the key $k$ is absent from dictionary~$D$.
\\item {\\tt F46A} --- {\\tt DICTIGETOPTREF} ($i$ $D$ $n$ -- $c^?$), similar to {\\tt DICTGETOPTREF}, but with the key given by signed $n$-bit {\\em Integer\\/}~$i$. If the key~$i$ is out of range, also returns {\\em Null}.
\\item {\\tt F46B} --- {\\tt DICTUGETOPTREF} ($i$ $D$ $n$ -- $c^?$), similar to {\\tt DICTGETOPTREF}, but with the key given by unsigned $n$-bit {\\em Integer\\/}~$i$.
\\item {\\tt F46D} --- {\\tt DICTSETGETOPTREF} ($c^?$ $k$ $D$ $n$ -- $D'$ $\\tilde c^?$), a variant of both {\\tt DICTGETOPTREF} and {\\tt DICTSETGETREF} that sets the value corresponding to key $k$ in dictionary~$D$ to $c^?$ (if $c^?$ is {\\em Null}, then the key is deleted instead), and returns the old value $\\tilde c^?$ (if the key $k$ was absent before, returns {\\em Null\\/} instead).
\\item {\\tt F46E} --- {\\tt DICTISETGETOPTREF} ($c^?$ $i$ $D$ $n$ -- $D'$ $\\tilde c^?$), similar to primitive {\\tt DICTSETGETOPTREF}, but using signed $n$-bit {\\em Integer\\/}~$i$ as a key. If $i$ does not fit into $n$ bits, throws a range checking exception.
\\item {\\tt F46F} --- {\\tt DICTUSETGETOPTREF} ($c^?$ $i$ $D$ $n$ -- $D'$ $\\tilde c^?$), similar to primitive {\\tt DICTSETGETOPTREF}, but using unsigned $n$-bit {\\em Integer\\/}~$i$ as a key.
\\end{itemize}

\\nxsubpoint\\emb{Prefix code dictionary operations}
These are some basic operations for constructing prefix code dictionaries (cf.~\\ptref{sp:pfx.dict.tlb}). The primary application for prefix code dictionaries is deserializing TL-B serialized data structures, or, more generally, parsing prefix codes. Therefore, most prefix code dictionaries will be constant and created at compile time, not by the following primitives.

Some \\textsc{Get} operations for prefix code dictionaries may be found in \\ptref{sp:prim.dict.get.spec}. Other prefix code dictionary operations include:
\\begin{itemize}
\\item {\\tt F470} --- {\\tt PFXDICTSET} ($x$ $k$ $D$ $n$ -- $D'$ $-1$ or $D$ $0$).
\\item {\\tt F471} --- {\\tt PFXDICTREPLACE} ($x$ $k$ $D$ $n$ -- $D'$ $-1$ or $D$ $0$).
\\item {\\tt F472} --- {\\tt PFXDICTADD} ($x$ $k$ $D$ $n$ -- $D'$ $-1$ or $D$ $0$).
\\item {\\tt F473} --- {\\tt PFXDICTDEL} ($k$ $D$ $n$ -- $D'$ $-1$ or $D$ $0$).
\\end{itemize}
These primitives are completely similar to their non-prefix code counterparts {\\tt DICTSET} etc (cf.~\\ptref{sp:prim.dict.set}), with the obvious difference that even a {\\sc Set} may fail in a prefix code dictionary, so a success flag must be returned by {\\tt PFXDICTSET} as well.

\\nxsubpoint\\emb{Variants of \\textsc{GetNext} and \\textsc{GetPrev} operations}
\\begin{itemize}
\\item {\\tt F474} --- {\\tt DICTGETNEXT} ($k$ $D$ $n$ -- $x'$ $k'$ $-1$ or $0$), computes the minimal key $k'$ in dictionary $D$ that is lexicographically greater than $k$, and returns $k'$ (represented by a {\\em Slice\\/}) along with associated value $x'$ (also represented by a {\\em Slice\\/}).
\\item {\\tt F475} --- {\\tt DICTGETNEXTEQ} ($k$ $D$ $n$ -- $x'$ $k'$ $-1$ or $0$), similar to {\\tt DICTGETNEXT}, but computes the minimal key $k'$ that is lexicographically greater than or equal to $k$.
\\item {\\tt F476} --- {\\tt DICTGETPREV} ($k$ $D$ $n$ -- $x'$ $k'$ $-1$ or $0$), similar to {\\tt DICTGETNEXT}, but computes the maximal key $k'$ lexicographically smaller than $k$.
\\item {\\tt F477} --- {\\tt DICTGETPREVEQ} ($k$ $D$ $n$ -- $x'$ $k'$ $-1$ or $0$), similar to {\\tt DICTGETPREV}, but computes the maximal key $k'$ lexicographically smaller than or equal to~$k$.
\\item {\\tt F478} --- {\\tt DICTIGETNEXT} ($i$ $D$ $n$ -- $x'$ $i'$ $-1$ or $0$), similar to {\\tt DICTGETNEXT}, but interprets all keys in dictionary $D$ as big-endian signed $n$-bit integers, and computes the minimal key $i'$ that is larger than {\\em Integer}~$i$ (which does not necessarily fit into $n$ bits).
\\item {\\tt F479} --- {\\tt DICTIGETNEXTEQ} ($i$ $D$ $n$ -- $x'$ $i'$ $-1$ or $0$).
\\item {\\tt F47A} --- {\\tt DICTIGETPREV} ($i$ $D$ $n$ -- $x'$ $i'$ $-1$ or $0$).
\\item {\\tt F47B} --- {\\tt DICTIGETPREVEQ} ($i$ $D$ $n$ -- $x'$ $i'$ $-1$ or $0$).
\\item {\\tt F47C} --- {\\tt DICTUGETNEXT} ($i$ $D$ $n$ -- $x'$ $i'$ $-1$ or $0$), similar to {\\tt DICTGETNEXT}, but interprets all keys in dictionary $D$ as big-endian unsigned $n$-bit integers, and computes the minimal key $i'$ that is larger than {\\em Integer}~$i$ (which does not necessarily fit into $n$ bits, and is not necessarily non-negative).
\\item {\\tt F47D} --- {\\tt DICTUGETNEXTEQ} ($i$ $D$ $n$ -- $x'$ $i'$ $-1$ or $0$).
\\item {\\tt F47E} --- {\\tt DICTUGETPREV} ($i$ $D$ $n$ -- $x'$ $i'$ $-1$ or $0$).
\\item {\\tt F47F} --- {\\tt DICTUGETPREVEQ} ($i$ $D$ $n$ -- $x'$ $i'$ $-1$ or $0$).
\\end{itemize}

\\nxsubpoint\\emb{\\textsc{GetMin}, \\textsc{GetMax}, \\textsc{RemoveMin}, \\textsc{RemoveMax} operations}
\\begin{itemize}
\\item {\\tt F482} --- {\\tt DICTMIN} ($D$ $n$ -- $x$ $k$ $-1$ or $0$), computes the minimal key $k$ (represented by a {\\em Slice} with $n$ data bits) in dictionary $D$, and returns $k$ along with the associated value~$x$.
\\item {\\tt F483} --- {\\tt DICTMINREF} ($D$ $n$ -- $c$ $k$ $-1$ or $0$), similar to {\\tt DICTMIN}, but returns the only reference in the value as a {\\em Cell\\/}~$c$.
\\item {\\tt F484} --- {\\tt DICTIMIN} ($D$ $n$ -- $x$ $i$ $-1$ or $0$), somewhat similar to {\\tt DICTMIN}, but computes the minimal key~$i$ under the assumption that all keys are big-endian signed $n$-bit integers. Notice that the key and value returned may differ from those computed by {\\tt DICTMIN} and {\\tt DICTUMIN}.
\\item {\\tt F485} --- {\\tt DICTIMINREF} ($D$ $n$ -- $c$ $i$ $-1$ or $0$).
\\item {\\tt F486} --- {\\tt DICTUMIN} ($D$ $n$ -- $x$ $i$ $-1$ or $0$), similar to {\\tt DICTMIN}, but returns the key as an unsigned $n$-bit {\\em Integer}~$i$.
\\item {\\tt F487} --- {\\tt DICTUMINREF} ($D$ $n$ -- $c$ $i$ $-1$ or $0$).
\\item {\\tt F48A} --- {\\tt DICTMAX} ($D$ $n$ -- $x$ $k$ $-1$ or $0$), computes the maximal key $k$ (represented by a {\\em Slice\\/} with $n$ data bits) in dictionary $D$, and returns $k$ along with the associated value~$x$.
\\item {\\tt F48B} --- {\\tt DICTMAXREF} ($D$ $n$ -- $c$ $k$ $-1$ or $0$).
\\item {\\tt F48C} --- {\\tt DICTIMAX} ($D$ $n$ -- $x$ $i$ $-1$ or $0$).
\\item {\\tt F48D} --- {\\tt DICTIMAXREF} ($D$ $n$ -- $c$ $i$ $-1$ or $0$).
\\item {\\tt F48E} --- {\\tt DICTUMAX} ($D$ $n$ -- $x$ $i$ $-1$ or $0$).
\\item {\\tt F48F} --- {\\tt DICTUMAXREF} ($D$ $n$ -- $c$ $i$ $-1$ or $0$).
\\item {\\tt F492} --- {\\tt DICTREMMIN} ($D$ $n$ -- $D'$ $x$ $k$ $-1$ or $D$ $0$), computes the minimal key $k$ (represented by a {\\em Slice} with $n$ data bits) in dictionary $D$, removes $k$ from the dictionary, and returns $k$ along with the associated value~$x$ and the modified dictionary~$D'$.
\\item {\\tt F493} --- {\\tt DICTREMMINREF} ($D$ $n$ -- $D'$ $c$ $k$ $-1$ or $D$ $0$), similar to {\\tt DICTREMMIN}, but returns the only reference in the value as a {\\em Cell\\/}~$c$.
\\item {\\tt F494} --- {\\tt DICTIREMMIN} ($D$ $n$ -- $D'$ $x$ $i$ $-1$ or $D$ $0$), somewhat similar to {\\tt DICTREMMIN}, but computes the minimal key~$i$ under the assumption that all keys are big-endian signed $n$-bit integers. Notice that the key and value returned may differ from those computed by {\\tt DICTREMMIN} and {\\tt DICTUREMMIN}.
\\item {\\tt F495} --- {\\tt DICTIREMMINREF} ($D$ $n$ -- $D'$ $c$ $i$ $-1$ or $D$ $0$).
\\item {\\tt F496} --- {\\tt DICTUREMMIN} ($D$ $n$ -- $D'$ $x$ $i$ $-1$ or $D$ $0$), similar to {\\tt DICTREMMIN}, but returns the key as an unsigned $n$-bit {\\em Integer}~$i$.
\\item {\\tt F497} --- {\\tt DICTUREMMINREF} ($D$ $n$ -- $D'$ $c$ $i$ $-1$ or $D$ $0$).
\\item {\\tt F49A} --- {\\tt DICTREMMAX} ($D$ $n$ -- $D'$ $x$ $k$ $-1$ or $D$ $0$), computes the maximal key $k$ (represented by a {\\em Slice\\/} with $n$ data bits) in dictionary $D$, removes $k$ from the dictionary, and returns $k$ along with the associated value~$x$ and the modified dictionary~$D'$.
\\item {\\tt F49B} --- {\\tt DICTREMMAXREF} ($D$ $n$ -- $D'$ $c$ $k$ $-1$ or $D$ $0$).
\\item {\\tt F49C} --- {\\tt DICTIREMMAX} ($D$ $n$ -- $D'$ $x$ $i$ $-1$ or $D$ $0$).
\\item {\\tt F49D} --- {\\tt DICTIREMMAXREF} ($D$ $n$ -- $D'$ $c$ $i$ $-1$ or $D$ $0$).
\\item {\\tt F49E} --- {\\tt DICTUREMMAX} ($D$ $n$ -- $D'$ $x$ $i$ $-1$ or $D$ $0$).
\\item {\\tt F49F} --- {\\tt DICTUREMMAXREF} ($D$ $n$ -- $D'$ $c$ $i$ $-1$ or $D$ $0$).
\\end{itemize}

\\nxsubpoint\\label{sp:prim.dict.get.spec}\\emb{Special {\\sc Get} dictionary and prefix code dictionary operations, and constant dictionaries}
\\begin{itemize}
\\item {\\tt F4A0} --- {\\tt DICTIGETJMP} ($i$ $D$ $n$ -- ), similar to {\\tt DICTIGET} (cf.~\\ptref{sp:prim.dict.get}), but with $x$ {\\tt BLESS}ed into a continuation with a subsequent {\\tt JMPX} to it on success. On failure, does nothing. This is useful for implementing {\\tt switch}/{\\tt case} constructions.
\\item {\\tt F4A1} --- {\\tt DICTUGETJMP} ($i$ $D$ $n$ -- ), similar to {\\tt DICTIGETJMP}, but performs {\\tt DICTUGET} instead of {\\tt DICTIGET}.
\\item {\\tt F4A2} --- {\\tt DICTIGETEXEC} ($i$ $D$ $n$ -- ), similar to {\\tt DICTIGETJMP}, but with {\\tt EXECUTE} instead of {\\tt JMPX}.
\\item {\\tt F4A3} --- {\\tt DICTUGETEXEC} ($i$ $D$ $n$ -- ), similar to {\\tt DICTUGETJMP}, but with {\\tt EXECUTE} instead of {\\tt JMPX}.
\\item {\\tt F4A6\\_$n$} --- {\\tt DICTPUSHCONST $n$} ( -- $D$ $n$), pushes a non-empty constant dictionary $D$ (as a $\\textit{Cell\\/}^?$) along with its key length $0\\leq n\\leq 1023$, stored as a part of the instruction. The dictionary itself is created from the first of remaining references of the current continuation. In this way, the complete {\\tt DICTPUSHCONST} instruction can be obtained by first serializing {\\tt xF4A8\\_}, then the non-empty dictionary itself (one {\\tt 1} bit and a cell reference), and then the unsigned 10-bit integer $n$ (as if by a {\\tt STU 10} instruction). An empty dictionary can be pushed by a {\\tt NEWDICT} primitive (cf.~\\ptref{sp:prim.dict.create}) instead.
\\item {\\tt F4A8} --- {\\tt PFXDICTGETQ} ($s$ $D$ $n$ -- $s'$ $x$ $s''$ $-1$ or $s$ $0$), looks up the unique prefix of {\\em Slice} $s$ present in the prefix code dictionary (cf.~\\ptref{sp:pfx.dict.tlb}) represented by $\\textit{Cell\\/}^?$ $D$ and $0\\leq n\\leq 1023$. If found, the prefix of $s$ is returned as $s'$, and the corresponding value (also a {\\em Slice}) as $x$. The remainder of $s$ is returned as a {\\em Slice\\/} $s''$. If no prefix of $s$ is a key in prefix code dictionary $D$, returns the unchanged $s$ and a zero flag to indicate failure.
\\item {\\tt F4A9} --- {\\tt PFXDICTGET} ($s$ $D$ $n$ -- $s'$ $x$ $s''$), similar to {\\tt PFXDICTGET}, but throws a cell deserialization failure exception on failure.
\\item {\\tt F4AA} --- {\\tt PFXDICTGETJMP} ($s$ $D$ $n$ -- $s'$ $s''$ or $s$), similar to {\\tt PFXDICTGETQ}, but on success {\\tt BLESS}es the value $x$ into a {\\em Continuation\\/} and transfers control to it as if by a {\\tt JMPX}. On failure, returns $s$ unchanged and continues execution.
\\item {\\tt F4AB} --- {\\tt PFXDICTGETEXEC} ($s$ $D$ $n$ -- $s'$ $s''$), similar to {\\tt PFXDICTGETJMP}, but {\\tt EXEC}utes the continuation found instead of jumping to it. On failure, throws a cell deserialization exception.
\\item {\\tt F4AE\\_$n$} --- {\\tt PFXDICTCONSTGETJMP $n$} or {\\tt PFXDICTSWITCH $n$} ($s$ -- $s'$ $s''$ or $s$), combines {\\tt DICTPUSHCONST $n$} for $0\\leq n\\leq 1023$ with {\\tt PFXDICTGETJMP}.
\\end{itemize}

\\nxsubpoint\\label{sp:prim.dict.get}\\emb{{\\sc SubDict} dictionary operations}
\\begin{itemize}
\\item {\\tt F4B1} --- {\\tt SUBDICTGET} ($k$ $l$ $D$ $n$ -- $D'$), constructs a subdictionary consisting of all keys beginning with prefix $k$ (represented by a {\\em Slice}, the first $0\\leq l\\leq n\\leq 1023$ data bits of which are used as a key) of length~$l$ in dictionary $D$ of type $\\HashmapE(n,X)$ with $n$-bit keys. On success, returns the new subdictionary of the same type $\\HashmapE(n,X)$ as a {\\em Slice}~$D'$.
\\item {\\tt F4B2} --- {\\tt SUBDICTIGET} ($x$ $l$ $D$ $n$ -- $D'$), variant of {\\tt SUBDICTGET} with the prefix represented by a signed big-endian $l$-bit {\\em Integer\\/}~$x$, where necessarily $l\\leq257$.
\\item {\\tt F4B3} --- {\\tt SUBDICTUGET} ($x$ $l$ $D$ $n$ -- $D'$), variant of {\\tt SUBDICTGET} with the prefix represented by an unsigned big-endian $l$-bit {\\em Integer\\/}~$x$, where necessarily $l\\leq256$.
\\item {\\tt F4B5} --- {\\tt SUBDICTRPGET} ($k$ $l$ $D$ $n$ -- $D'$), similar to {\\tt SUBDICTGET}, but removes the common prefix $k$ from all keys of the new dictionary $D'$, which becomes of type $\\HashmapE(n-l,X)$.
\\item {\\tt F4B6} --- {\\tt SUBDICTIRPGET} ($x$ $l$ $D$ $n$ -- $D'$), variant of {\\tt SUBDICTRPGET} with the prefix represented by a signed big-endian $l$-bit {\\em Integer\\/}~$x$, where necessarily $l\\leq257$.
\\item {\\tt F4B7} --- {\\tt SUBDICTURPGET} ($x$ $l$ $D$ $n$ -- $D'$), variant of {\\tt SUBDICTRPGET} with the prefix represented by an unsigned big-endian $l$-bit {\\em Integer\\/}~$x$, where necessarily $l\\leq256$.
\\end{itemize}

\\mysubsection{Application-specific primitives}\\label{p:prim.app}
Opcode range {\\tt F8}\\dots{\\tt FB} is reserved for the {\\em application-specific primitives}. When TVM is used to execute TON Blockchain smart contracts, these application-specific primitives are in fact TON Blockchain-specific.

\\nxsubpoint\\emb{External actions and access to blockchain configuration data}
Some of the primitives listed below pretend to produce some externally visible actions, such as sending a message to another smart contract. In fact, the execution of a smart contract in TVM never has any effect apart from a modification of the TVM state. All external actions are collected into a linked list stored in special register {\\tt c5} (\`\`output actions''). Additionally, some primitives use the data kept in the first component of the {\\em Tuple\\/} stored in {\\tt c7} (\`\`root of temporary data'', cf.~\\ptref{sp:cr.list}). Smart contracts are free to modify any other data kept in the cell {\\tt c7}, provided the first reference remains intact (otherwise some application-specific primitives would be likely to throw exceptions when invoked).

Most of the primitives listed below use 16-bit opcodes.

\\nxsubpoint\\emb{Gas-related primitives}
Of the following primitives, only the first two are \`\`pure'' in the sense that they do not use {\\tt c5} or {\\tt c7}.
\\begin{itemize}
\\item {\\tt F800} --- {\\tt ACCEPT}, sets current gas limit $g_l$ to its maximal allowed value $g_m$, and resets the gas credit $g_c$ to zero (cf.~\\ptref{p:tvm.state}), decreasing the value of $g_r$ by $g_c$ in the process. In other words, the current smart contract agrees to buy some gas to finish the current transaction. This action is required to process external messages, which bring no value (hence no gas) with themselves.
\\item {\\tt F801} --- {\\tt SETGASLIMIT} ($g$ -- ), sets current gas limit $g_l$ to the minimum of $g$ and $g_m$, and resets the gas credit $g_c$ to zero. If the gas consumed so far (including the present instruction) exceeds the resulting value of $g_l$, an (unhandled) out of gas exception is thrown before setting new gas limits. Notice that {\\tt SETGASLIMIT} with an argument $g\\geq 2^{63}-1$ is equivalent to {\\tt ACCEPT}.
\\item {\\tt F802} --- {\\tt BUYGAS} ($x$ -- ), computes the amount of gas that can be bought for $x$ nanograms, and sets $g_l$ accordingly in the same way as {\\tt SETGASLIMIT}.
\\item {\\tt F804} --- {\\tt GRAMTOGAS} ($x$ -- $g$), computes the amount of gas that can be bought for $x$ nanograms. If $x$ is negative, returns 0. If $g$ exceeds $2^{63}-1$, it is replaced with this value.
\\item {\\tt F805} --- {\\tt GASTOGRAM} ($g$ -- $x$), computes the price of $g$ gas in nanograms.
\\item {\\tt F806}--{\\tt F80F} --- Reserved for gas-related primitives.
\\end{itemize}

\\nxsubpoint\\emb{Pseudo-random number generator primitives}
The pseudo-random number generator uses the random seed and (sometimes) other data kept in {\\tt c7}.
\\begin{itemize}
\\item {\\tt F810}--{\\tt F81F} --- Reserved for pseudo-random number generator primitives.
\\end{itemize}

\\nxsubpoint\\emb{Configuration primitives}\\label{sp:prim.conf.param}
The following primitives read configuration data provided in the {\\em Tuple\\/} stored in the first component of the {\\em Tuple\\/} at {\\tt c7}. Whenever TVM is invoked for executing TON Blockchain smart contracts, this {\\em Tuple\\/} is initialized by a {\\em SmartContractInfo\\/} structure; configuration primitives assume that it has remained intact.
\\begin{itemize}
\\item {\\tt F82$i$} --- {\\tt GETPARAM $i$} ( -- $x$), returns the $i$-th parameter from the {\\em Tuple\\/} provided at {\\tt c7} for $0\\leq i<16$. Equivalent to {\\tt PUSH c7}; {\\tt FIRST}; {\\tt INDEX $i$}. If one of these internal operations fails, throws an appropriate type checking or range checking exception.
\\item {\\tt F823} --- {\\tt NOW} ( -- $x$), returns the current Unix time as an {\\em Integer}. If it is impossible to recover the requested value starting from {\\tt c7}, throws a type checking or range checking exception as appropriate. Equivalent to {\\tt PUSH c7}; {\\tt FIRST}; {\\tt INDEX 3}.
\\item {\\tt F824} --- {\\tt BLOCKLT} ( -- $x$), returns the starting logical time of the current block. Equivalent to {\\tt PUSH c7}; {\\tt FIRST}; {\\tt INDEX 4}.
\\item {\\tt F825} --- {\\tt LTIME} ( -- $x$), returns the logical time of the current transaction. Equivalent to {\\tt PUSH c7}; {\\tt FIRST}; {\\tt INDEX 5}.
\\item {\\tt F828} --- {\\tt MYADDR} ( -- $s$), returns the internal address of the current smart contract as a {\\em Slice\\/} with a {\\tt MsgAddressInt}. If necessary, it can be parsed further using primitives such as {\\tt PARSESTDADDR} or {\\tt REWRITESTDADDR}. Equivalent to {\\tt PUSH c7}; {\\tt FIRST}; {\\tt INDEX 8}.
\\item {\\tt F829} --- {\\tt CONFIGROOT} ( -- $D$), returns the {\\em Maybe Cell\\/}~$D$ with the current global configuration dictionary. Equivalent to {\\tt PUSH c7}; {\\tt FIRST}; {\\tt INDEX 9}.
\\item {\\tt F830} --- {\\tt CONFIGDICT} ( -- $D$ $32$), returns the global configuration dictionary along with its key length (32). Equivalent to {\\tt CONFIGROOT}; {\\tt PUSHINT 32}.
\\item {\\tt F832} --- {\\tt CONFIGPARAM} ($i$ -- $c$ $-1$ or $0$), returns the value of the global configuration parameter with integer index $i$ as a {\\em Cell\\/}~$c$, and a flag to indicate success. Equivalent to {\\tt CONFIGDICT}; {\\tt DICTIGETREF}.
\\item {\\tt F833} --- {\\tt CONFIGOPTPARAM} ($i$ -- $c^?$), returns the value of the global configuration parameter with integer index $i$ as a {\\em Maybe Cell\\/}~$c^?$. Equivalent to {\\tt CONFIGDICT}; {\\tt DICTIGETOPTREF}.
\\item {\\tt F820}---{\\tt F83F} --- Reserved for configuration primitives.
\\end{itemize}

\\nxsubpoint\\emb{Global variable primitives}
The \`\`global variables'' may be helpful in implementing some high-level smart-contract languages. They are in fact stored as components of the {\\em Tuple\\/} at {\\tt c7}: the $k$-th global variable simply is the $k$-th component of this {\\em Tuple}, for $1\\leq k\\leq 254$. By convention, the $0$-th component is used for the \`\`configuration parameters'' of~\\ptref{sp:prim.conf.param}, so it is not available as a global variable.
\\begin{itemize}
\\item {\\tt F840} --- {\\tt GETGLOBVAR} ($k$ -- $x$), returns the $k$-th global variable for $0\\leq k<255$. Equivalent to {\\tt PUSH c7}; {\\tt SWAP}; {\\tt INDEXVARQ} (cf.~\\ptref{sp:prim.tuple}).
\\item {\\tt F85\\_$k$} --- {\\tt GETGLOB $k$} ( -- $x$), returns the $k$-th global variable for $1\\leq k\\leq 31$. Equivalent to {\\tt PUSH c7}; {\\tt INDEXQ $k$}.
\\item {\\tt F860} --- {\\tt SETGLOBVAR} ($x$ $k$ -- ), assigns $x$ to the $k$-th global variable for $0\\leq k<255$. Equivalent to {\\tt PUSH c7}; {\\tt ROTREV}; {\\tt SETINDEXVARQ}; {\\tt POP c7}.
\\item {\\tt F87\\_$k$} --- {\\tt SETGLOB $k$} ($x$ -- ), assigns $x$ to the $k$-th global variable for $1\\leq k\\leq 31$. Equivalent to {\\tt PUSH c7}; {\\tt SWAP}; {\\tt SETINDEXQ $k$}; {\\tt POP c7}.
\\end{itemize}

\\nxsubpoint\\emb{Hashing and cryptography primitives}
\\begin{itemize}
\\item {\\tt F900} --- {\\tt HASHCU} ($c$ -- $x$), computes the representation hash (cf.~\\ptref{sp:repr.hash}) of a {\\em Cell\\/} $c$ and returns it as a 256-bit unsigned integer~$x$. Useful for signing and checking signatures of arbitrary entities represented by a tree of cells.
\\item {\\tt F901} --- {\\tt HASHSU} ($s$ -- $x$), computes the hash of a {\\em Slice\\/} $s$ and returns it as a 256-bit unsigned integer~$x$. The result is the same as if an ordinary cell containing only data and references from~$s$ had been created and its hash computed by {\\tt HASHCU}.
\\item {\\tt F902} --- {\\tt SHA256U} ($s$ -- $x$), computes $\\Sha$ of the data bits of~{\\em Slice\\/}~$s$. If the bit length of $s$ is not divisible by eight, throws a cell underflow exception. The hash value is returned as a 256-bit unsigned integer~$x$.
\\item {\\tt F910} --- {\\tt CHKSIGNU} ($h$ $s$ $k$ -- $?$), checks the Ed25519-signature $s$ of a hash $h$ (a 256-bit unsigned integer, usually computed as the hash of some data) using public key $k$ (also represented by a 256-bit unsigned integer). The signature $s$ must be a {\\em Slice\\/} containing at least 512 data bits; only the first 512 bits are used. The result is $-1$ if the signature is valid, $0$ otherwise. Notice that {\\tt CHKSIGNU} is equivalent to {\\tt ROT}; {\\tt NEWB}; {\\tt STU 256}; {\\tt ENDB}; {\\tt NEWC}; {\\tt ROTREV}; {\\tt CHKSIGNS}, i.e., to {\\tt CHKSIGNS} with the first argument $d$ set to 256-bit {\\em Slice} containing~$h$. Therefore, if $h$ is computed as the hash of some data, these data are hashed {\\em twice}, the second hashing occurring inside {\\tt CHKSIGNS}. 
\\item {\\tt F911} --- {\\tt CHKSIGNS} ($d$ $s$ $k$ -- $?$), checks whether $s$ is a valid Ed25519-signature of the data portion of {\\em Slice\\/}~$d$ using public key~$k$, similarly to {\\tt CHKSIGNU}. If the bit length of {\\em Slice\\/}~$d$ is not divisible by eight, throws a cell underflow exception. The verification of Ed25519 signatures is the standard one, with $\\Sha$ used to reduce $d$ to the 256-bit number that is actually signed. 
\\item {\\tt F902}--{\\tt F93F} --- Reserved for hashing and cryptography primitives.
\\end{itemize}

\\nxsubpoint\\emb{Currency manipulation primitives}
\\begin{itemize}
\\item {\\tt FA00} --- {\\tt LDGRAMS} or {\\tt LDVARUINT16} ($s$ -- $x$ $s'$), loads (deserializes) a {\\tt Gram\\/} or {\\tt VarUInteger 16} amount from {\\em CellSlice\\/}~$s$, and returns the amount as {\\em Integer\\/}~$x$ along with the remainder $s'$ of~$s$. The expected serialization of $x$ consists of a 4-bit unsigned big-endian integer~$l$, followed by an $8l$-bit unsigned big-endian representation of~$x$. The net effect is approximately equivalent to {\\tt LDU 4}; {\\tt SWAP}; {\\tt LSHIFT 3}; {\\tt LDUX}.
\\item {\\tt FA01} --- {\\tt LDVARINT16} ($s$ -- $x$ $s'$), similar to {\\tt LDVARUINT16}, but loads a {\\em signed\\/} {\\em Integer\\/}~$x$. Approximately equivalent to {\\tt LDU 4}; {\\tt SWAP}; {\\tt LSHIFT 3}; {\\tt LDIX}.
\\item {\\tt FA02} --- {\\tt STGRAMS} or {\\tt STVARUINT16} ($b$ $x$ -- $b'$), stores (serializes) an {\\em Integer\\/}~$x$ in the range $0\\ldots2^{120}-1$ into {\\em Builder\\/}~$b$, and returns the resulting {\\em Builder\\/}~$b'$. The serialization of $x$ consists of a 4-bit unsigned big-endian integer $l$, which is the smallest integer $l\\geq0$, such that $x<2^{8l}$, followed by an $8l$-bit unsigned big-endian representation of~$x$. If $x$ does not belong to the supported range, a range check exception is thrown.
\\item {\\tt FA03} --- {\\tt STVARINT16} ($b$ $x$ -- $b'$), similar to {\\tt STVARUINT16}, but serializes a {\\em signed\\/} {\\em Integer\\/}~$x$ in the range $-2^{119}\\ldots2^{119}-1$.
\\item {\\tt FA04} --- {\\tt LDVARUINT32} ($s$ -- $x$ $s'$), loads (deserializes) a {\\tt VarUInteger 32} from {\\em CellSlice\\/}~$s$, and returns the deserialized value as an {\\em Integer\\/}~$0\\leq x<2^{248}$. The expected serialization of $x$ consists of a 5-bit unsigned big-endian integer~$l$, followed by an $8l$-bit unsigned big-endian representation of $x$. The net effect is approximately equivalent to {\\tt LDU 5}; {\\tt SWAP}; {\\tt SHIFT 3}; {\\tt LDUX}.
\\item {\\tt FA05} --- {\\tt LDVARINT32} ($s$ -- $x$ $s'$), deserializes a {\\tt VarInteger 32} from {\\em CellSlice\\/}~$s$, and returns the deserialized value as an {\\em Integer\\/}~$-2^{247}\\leq x<2^{247}$.
\\item {\\tt FA06} --- {\\tt STVARUINT32} ($b$ $x$ -- $b'$), serializes an {\\em Integer\\/} $0\\leq x<2^{248}$ as a {\\tt VarUInteger 32}.
\\item {\\tt FA07} --- {\\tt STVARINT32} ($b$ $x$ -- $b'$), serializes an {\\em Integer\\/} $-2^{247}\\leq x<2^{247}$ as a {\\tt VarInteger 32}.
\\item {\\tt FA08}--{\\tt FA1F} --- Reserved for currency manipulation primitives.
\\end{itemize}

\\nxsubpoint\\emb{Message and address manipulation primitives}
The message and address manipulation primitives listed below serialize and deserialize values according to the following TL-B scheme (cf.~\\ptref{sp:tlb.brief}):
\\begin{verbatim}
addr_none$00 = MsgAddressExt;
addr_extern$01 len:(## 8) external_address:(bits len) 
             = MsgAddressExt;
anycast_info$_ depth:(#<= 30) { depth >= 1 }
   rewrite_pfx:(bits depth) = Anycast;
addr_std$10 anycast:(Maybe Anycast) 
   workchain_id:int8 address:bits256  = MsgAddressInt;
addr_var$11 anycast:(Maybe Anycast) addr_len:(## 9) 
   workchain_id:int32 address:(bits addr_len) = MsgAddressInt;
_ _:MsgAddressInt = MsgAddress;
_ _:MsgAddressExt = MsgAddress;
int_msg_info$0 ihr_disabled:Bool bounce:Bool bounced:Bool
  src:MsgAddress dest:MsgAddressInt 
  value:CurrencyCollection ihr_fee:Grams fwd_fee:Grams
  created_lt:uint64 created_at:uint32 = CommonMsgInfoRelaxed;
ext_out_msg_info$11 src:MsgAddress dest:MsgAddressExt
  created_lt:uint64 created_at:uint32 = CommonMsgInfoRelaxed;
\\end{verbatim}
A deserialized {\\tt MsgAddress} is represented by a {\\em Tuple\\/}~$t$ as follows:
\\begin{itemize}
\\item {\\tt addr\\_none} is represented by $t=(0)$, i.e., a {\\em Tuple\\/} containing exactly one {\\em Integer\\/} equal to zero.
\\item {\\tt addr\\_extern} is represented by $t=(1,s)$, where {\\em Slice\\/}~$s$ contains the field {\\tt external\\_address}. In other words, $t$ is a pair (a {\\em Tuple\\/} consisting of two entries), containing an {\\em Integer\\/} equal to one and {\\em Slice}~$s$.
\\item {\\tt addr\\_std} is represented by $t=(2,u,x,s)$, where $u$ is either a {\\em Null\\/} (if {\\tt anycast} is absent) or a {\\em Slice\\/}~$s'$ containing {\\tt rewrite\\_pfx} (if {\\tt anycast} is present). Next, {\\em Integer\\/}~$x$ is the {\\tt workchain\\_id}, and {\\em Slice\\/}~$s$ contains the {\\tt address}.
\\item {\\tt addr\\_var} is represented by $t=(3,u,x,s)$, where $u$, $x$, and $s$ have the same meaning as for {\\tt addr\\_std}.
\\end{itemize}
The following primitives, which use the above conventions, are defined:
\\begin{itemize}
\\item {\\tt FA40} --- {\\tt LDMSGADDR} ($s$ -- $s'$ $s''$), loads from {\\em CellSlice\\/}~$s$ the only prefix that is a valid {\\tt MsgAddress}, and returns both this prefix $s'$ and the remainder $s''$ of~$s$ as {\\em CellSlice\\/}s.
\\item {\\tt FA41} --- {\\tt LDMSGADDRQ} ($s$ -- $s'$ $s''$ $-1$ or $s$ $0$), a quiet version of {\\tt LDMSGADDR}: on success, pushes an extra $-1$; on failure, pushes the original~$s$ and a zero.
\\item {\\tt FA42} --- {\\tt PARSEMSGADDR} ($s$ -- $t$), decomposes {\\em CellSlice\\/}~$s$ containing a valid {\\tt MsgAddress} into a {\\em Tuple\\/}~$t$ with separate fields of this {\\tt MsgAddress}. If $s$ is not a valid {\\tt MsgAddress}, a cell deserialization exception is thrown.
\\item {\\tt FA43} --- {\\tt PARSEMSGADDRQ} ($s$ -- $t$ $-1$ or $0$), a quiet version of {\\tt PARSEMSGADDR}: returns a zero on error instead of throwing an exception.
\\item {\\tt FA44} --- {\\tt REWRITESTDADDR} ($s$ -- $x$ $y$), parses {\\em CellSlice\\/}~$s$ containing a valid {\\tt MsgAddressInt} (usually a {\\tt msg\\_addr\\_std}), applies rewriting from the {\\tt anycast} (if present) to the same-length prefix of the address, and returns both the workchain $x$ and the 256-bit address $y$ as {\\em Integer\\/}s. If the address is not 256-bit, or if $s$ is not a valid serialization of {\\tt MsgAddressInt}, throws a cell deserialization exception.
\\item {\\tt FA45} --- {\\tt REWRITESTDADDRQ} ($s$ -- $x$ $y$ $-1$ or $0$), a quiet version of primitive {\\tt REWRITESTDADDR}.
\\item {\\tt FA46} --- {\\tt REWRITEVARADDR} ($s$ -- $x$ $s'$), a variant of {\\tt REWRITESTDADDR} that returns the (rewritten) address as a {\\em Slice\\/} s, even if it is not exactly 256 bit long (represented by a {\\tt msg\\_addr\\_var}).
\\item {\\tt FA47} --- {\\tt REWRITEVARADDRQ} ($s$ -- $x$ $s'$ $-1$ or $0$), a quiet version of primitive {\\tt REWRITEVARADDR}.
\\item {\\tt FA48}--{\\tt FA5F} --- Reserved for message and address manipulation primitives.
\\end{itemize}

\\nxsubpoint\\emb{Outbound message and output action primitives}
\\begin{itemize}
\\item {\\tt FB00} --- {\\tt SENDRAWMSG} ($c$ $x$ -- ), sends a raw message contained in {\\em Cell $c$}, which should contain a correctly serialized object {\\tt Message $X$}, with the only exception that the source address is allowed to have dummy value {\\tt addr\\_none} (to be automatically replaced with the current smart-contract address), and {\\tt ihr\\_fee}, {\\tt fwd\\_fee}, {\\tt created\\_lt} and {\\tt created\\_at} fields can have arbitrary values (to be rewritten with correct values during the action phase of the current transaction). Integer parameter $x$ contains the flags. Currently $x=0$ is used for ordinary messages; $x=128$ is used for messages that are to carry all the remaining balance of the current smart contract (instead of the value originally indicated in the message); $x=64$ is used for messages that carry all the remaining value of the inbound message in addition to the value initially indicated in the new message (if bit 0 is not set, the gas fees are deducted from this amount); $x'=x+1$ means that the sender wants to pay transfer fees separately; $x'=x+2$ means that any errors arising while processing this message during the action phase should be ignored.
\\item {\\tt FB02} --- {\\tt RAWRESERVE} ($x$ $y$ -- ), creates an output action which would reserve exactly $x$ nanograms (if $y=0$), at most $x$ nanograms (if $y=2$), or all but $x$ nanograms (if $y=1$ or $y=3$), from the remaining balance of the account. It is roughly equivalent to creating an outbound message carrying $x$ nanograms (or $b-x$ nanograms, where $b$ is the remaining balance) to oneself, so that the subsequent output actions would not be able to spend more money than the remainder. Bit $+2$ in $y$ means that the external action does not fail if the specified amount cannot be reserved; instead, all remaining balance is reserved. Currently $x$ must be a non-negative integer, and $y$ must be in the range $0\\ldots 3$.
\\item {\\tt FB03} --- {\\tt RAWRESERVEX} ($s$ $y$ -- ), similar to {\\tt RAWRESERVE}, but accepts a {\\em Slice $s$} with a {\\em CurrencyCollection\\/} as an argument. In this way currencies other than Grams can be reserved.
\\item {\\tt FB04} --- {\\tt SETCODE} ($c$ -- ), creates an output action that would change this smart contract code to that given by {\\em Cell\\/}~$c$. Notice that this change will take effect only after the successful termination of the current run of the smart contract.
\\item {\\tt FB05}--{\\tt FB3F} --- Reserved for output action primitives.
\\end{itemize}

\\mysubsection{Debug primitives}\\label{p:prim.debug}
Opcodes beginning with {\\tt FE} are reserved for the {\\em debug primitives}. These primitives have known fixed operation length, and behave as (multibyte) NOP operations. In particular, they never change the stack contents, and never throw exceptions, unless there are not enough bits to completely decode the opcode. However, when invoked in a TVM instance with debug mode enabled, these primitives can produce specific output into the text debug log of the TVM instance, never affecting the TVM state (so that from the perspective of TVM the behavior of debug primitives in debug mode is exactly the same). For instance, a debug primitive might dump all or some of the values near the top of the stack, display the current state of TVM and so on.

\\nxsubpoint\\emb{Debug primitives as operations without side-effect}
Next we describe the debug primitives that might (and actually are) implemented in a version of TVM. Notice that another TVM implementation is free to use these codes for other debug purposes, or treat them as multibyte NOPs. Whenever these primitives need some arguments from the stack, they inspect these arguments, but leave them intact in the stack. If there are insufficient values in the stack, or they have incorrect types, debug primitives may output error messages into the debug log, or behave as NOPs, but they cannot throw exceptions.
\\begin{itemize}
\\item {\\tt FE00} --- {\\tt DUMPSTK}, dumps the stack (at most the top 255 values) and shows the total stack depth.
\\item {\\tt FE0$n$} --- {\\tt DUMPSTKTOP $n$}, $1\\leq n<15$, dumps the top $n$ values from the stack, starting from the deepest of them. If there are $d<n$ values available, dumps only $d$ values.
\\item {\\tt FE10} --- {\\tt HEXDUMP}, dumps {\\tt s0} in hexadecimal form, be it a {\\em Slice} or an {\\em Integer}.
\\item {\\tt FE11} --- {\\tt HEXPRINT}, similar to {\\tt HEXDUMP}, except the hexadecimal representation of {\\tt s0} is not immediately output, but rather concatenated to an output text buffer.
\\item {\\tt FE12} --- {\\tt BINDUMP}, dumps {\\tt s0} in binary form, similarly to {\\tt HEXDUMP}.
\\item {\\tt FE13} --- {\\tt BINPRINT}, outputs the binary representation of {\\tt s0} to a text buffer.
\\item {\\tt FE14} --- {\\tt STRDUMP}, dumps the {\\em Slice} at {\\tt s0} as an UTF-8 string.
\\item {\\tt FE15} --- {\\tt STRPRINT}, similar to {\\tt STRDUMP}, but outputs the string into a text buffer (without carriage return).
\\item {\\tt FE1E} --- {\\tt DEBUGOFF}, disables all debug output until it is re-enabled by a {\\tt DEBUGON}. More precisely, this primitive increases an internal counter, which disables all debug operations (except {\\tt DEBUGOFF} and {\\tt DEBUGON}) when strictly positive.
\\item {\\tt FE1F} --- {\\tt DEBUGON}, enables debug output (in a debug version of TVM).
\\item {\\tt FE2$n$} --- {\\tt DUMP s$(n)$}, $0\\leq n<15$, dumps {\\tt s}$(n)$.
\\item {\\tt FE3$n$} --- {\\tt PRINT s$(n)$}, $0\\leq n<15$, concatenates the text representation of {\\tt s}$(n)$ (without any leading or trailing spaces or carriage returns) to a text buffer which will be output before the output of any other debug operation.
\\item {\\tt FEC0--FEEF} --- Use these opcodes for custom/experimental debug operations.
\\item {\\tt FEF$nssss$} --- {\\tt DUMPTOSFMT $ssss$}, dumps {\\tt s0} formatted according to the $(n+1)$-byte string $ssss$. This string might contain (a prefix of) the name of a TL-B type supported by the debugger. If the string begins with a zero byte, simply outputs it (without the first byte) into the debug log. If the string begins with a byte equal to one, concatenates it to a buffer, which will be output before the output of any other debug operation (effectively outputs a string without a carriage return).
\\item {\\tt FEF$n$00$ssss$} --- {\\tt LOGSTR $ssss$}, string $ssss$ is $n$ bytes long.
\\item {\\tt FEF000} --- {\\tt LOGFLUSH}, flushes all pending debug output from the buffer into the debug log.
\\item {\\tt FEF$n$01$ssss$} --- {\\tt PRINTSTR $ssss$}, string $ssss$ is $n$ bytes long.
\\end{itemize}

\\mysubsection{Codepage primitives}\\label{p:prim.codepage}
The following primitives, which begin with byte {\\tt FF}, typically are used at the very beginning of a smart contract's code or a library subroutine to select another TVM codepage. Notice that we expect all codepages to contain these primitives with the same codes, otherwise switching back to another codepage might be impossible (cf.~\\ptref{sp:setcp.opc}).
\\begin{itemize}
\\item {\\tt FF$nn$} --- {\\tt SETCP $nn$}, selects TVM codepage $0\\leq nn<240$. If the codepage is not supported, throws an invalid opcode exception.
\\item {\\tt FF00} --- {\\tt SETCP0}, selects TVM (test) codepage zero as described in this document.
\\item {\\tt FFF$z$} --- {\\tt SETCP $z-16$}, selects TVM codepage $z-16$ for $1\\leq z\\leq 15$. Negative codepages $-13\\ldots-1$ are reserved for restricted versions of TVM needed to validate runs of TVM in other codepages as explained in~\\ptref{sp:cp.minusone}. Negative codepage $-14$ is reserved for experimental codepages, not necessarily compatible between different TVM implementations, and should be disabled in the production versions of TVM.
\\item {\\tt FFF0} --- {\\tt SETCPX} ($c$ -- ), selects codepage $c$ with $-2^{15}\\leq c<2^{15}$ passed in the top of the stack.
\\end{itemize}`.split('\n');
let opcodes = [];
let wordMap = {};
let currentSection = null;
for (let i = 0; i < raw.length; i++) {
  let m = raw[i].match(/^\\nxsubpoint\\emb\{([^}]+)\}$/s);
  if (m) {
    // Section header
    currentSection = m[1];
    continue;
  }

  m = raw[i].match(/^\\item \{\\tt ([^}]+)\}(--\{\\tt ([^}]+)\})? --- (.+)$/s);
  if (m) {
    //console.log(`${m[1]}-${m[3]} — ${m[4]}`);
    const opcodeSt = m[1];
    const opcodeEn = m[3];

    let desc = m[4];
    let mnems = [];
    while (true) {
      m = desc.match(/^(?:also known as )?\{\\tt ([^}]+)\}[,.]?( or)? */s);
      if (m) {
        mnems.push(m[1]);
        desc = desc.replace(/^(?:also known as )?\{\\tt ([^}]+)\}[,.]?( or)? */s, '');
      } else {
        break;
      }
    }

    let stackIn = [];
    let stackOut = [];
    m = desc.match(/^\((.*) (?:--|-) ?(.*?)\)[,.]? */s);
    if (m) {
      stackIn.push(m[1]);
      stackOut.push(m[2]);
      desc = desc.replace(/^\((.*) (?:--|-) ?(.*?)\)[,.]? */s, '');
    }

    if (desc.length) {
      desc = desc[0].toUpperCase() + desc.slice(1);
    }

    opcodes.push({
      opcodeSt,
      opcodeEn,
      mnems,
      desc,
      stackIn,
      stackOut,
      section: currentSection,
    });
    for (let mnem of mnems) {
      let word = mnem.split(' ')[0];
      if (!(word in wordMap)) {
        wordMap[word] = {
          opcodes: [],
          section: currentSection,
          desc,
          word,
          isActive: false,
        }
      }
      wordMap[word].opcodes.push(opcodes[opcodes.length - 1]);
    }
  }
}
let dict = [];
for (let word in wordMap) {
  dict.push(wordMap[word]);
}
console.log(opcodes, wordMap);
