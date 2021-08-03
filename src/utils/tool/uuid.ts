export default function uuid(len: number = 8, radix: number = 62) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const id = [];
  let i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) {
      id[i] = chars[0 | (Math.random() * radix)];
    }
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    id[8] = id[13] = id[18] = id[23] = '-';
    id[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!id[i]) {
        r = 0 | (Math.random() * 16);
        id[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return id.join('');
}
