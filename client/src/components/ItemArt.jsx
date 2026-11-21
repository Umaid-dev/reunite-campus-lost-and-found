export default function ItemArt({ category, title }) {
  let drawing;
  if (category === 'Electronics')
    drawing = (
      <>
        <path d="M68 100V78a52 52 0 0 1 104 0v22" fill="none" stroke="#32443e" strokeWidth="17" />
        <path d="M68 92V78a52 52 0 0 1 104 0v14" fill="none" stroke="#78857d" strokeWidth="5" />
        <rect x="49" y="86" width="34" height="57" rx="15" fill="#273d35" />
        <rect x="157" y="86" width="34" height="57" rx="15" fill="#273d35" />
        <rect x="62" y="91" width="17" height="46" rx="8" fill="#52675b" />
        <rect x="161" y="91" width="17" height="46" rx="8" fill="#52675b" />
      </>
    );
  else if (category === 'Bags & accessories')
    drawing = (
      <>
        <path d="M83 70V49c0-30 74-30 74 0v21" fill="none" stroke="#aa8b60" strokeWidth="9" />
        <path d="M58 64h124l9 103H49z" fill="#e2cba4" />
        <path d="M66 74h106l7 84H60z" fill="#ecdbb8" />
        <path d="M77 65v92m86-92v92" stroke="#d6bd93" strokeWidth="3" />
        <rect x="99" y="105" width="42" height="33" rx="4" fill="#66816a" />
        <path d="M112 123l6 6 11-15" stroke="#d6e5c9" strokeWidth="3" fill="none" />
      </>
    );
  else if (category === 'Keys & cards')
    drawing = (
      <>
        <g transform="rotate(-25 120 95)">
          <circle cx="105" cy="62" r="25" fill="none" stroke="#9b8461" strokeWidth="9" />
          <path d="M99 83v71h15v-17h13v-13h-13V83z" fill="#cab586" />
          <rect x="133" y="42" width="28" height="91" rx="9" fill="#7393bc" />
          <path d="M146 50v74" stroke="#c4d9ec" strokeWidth="3" />
          <circle cx="105" cy="62" r="12" fill="none" stroke="#f7ecd4" strokeWidth="2" />
        </g>
      </>
    );
  else if (category === 'Clothing')
    drawing = (
      <>
        <path
          d="M91 46l-33 14-25 51 27 14 18-31v70h84V94l18 31 27-14-25-51-33-14z"
          fill="#54647d"
        />
        <path d="M91 46c-2-37 60-37 58 0l-29 24z" fill="#3b4b65" />
        <path d="M120 69v95" stroke="#a3b0bc" strokeWidth="3" />
        <path d="M92 45l10 51m47-51-11 51" stroke="#cad2d9" strokeWidth="2" />
        <path d="M88 124h22v24H88zm42 0h22v24h-22z" fill="#45556f" />
      </>
    );
  else if (category === 'Books & stationery')
    drawing = (
      <>
        <g transform="rotate(-10 120 95)">
          <rect x="72" y="27" width="103" height="139" rx="8" fill="#577893" />
          <path d="M84 27v139" stroke="#324f69" strokeWidth="6" />
          <path d="M95 162h76" stroke="#e8eadf" strokeWidth="6" />
          <rect x="103" y="55" width="47" height="35" rx="3" fill="#dce5df" />
          <path d="M112 66h29m-29 10h21" stroke="#9baea9" strokeWidth="3" />
        </g>
      </>
    );
  else
    drawing = (
      <>
        <rect x="92" y="38" width="56" height="125" rx="17" fill="#829c85" />
        <rect x="99" y="26" width="42" height="22" rx="6" fill="#3f5148" />
        <path d="M105 58v84" stroke="#b5cbb0" strokeWidth="6" strokeLinecap="round" />
        <path d="M147 37c30 0 29 39 3 39" fill="none" stroke="#3f5148" strokeWidth="7" />
      </>
    );
  return (
    <svg
      className="item-art"
      viewBox="0 0 240 190"
      role="img"
      aria-label={`${category} illustration for ${title}`}
    >
      <ellipse cx="120" cy="171" rx="67" ry="7" fill="#24362b" opacity=".07" />
      {drawing}
    </svg>
  );
}
