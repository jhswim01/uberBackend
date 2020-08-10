const privateResolver = (resolverFunction) => async (
  parent,
  args,
  context,
  info
) => {
  if (!context.req.user) {
    throw new Error("No JWT. I refused to proceed");
  }
  const resolved = await resolverFunction(parent, args, context, info);
  return resolved;
};

export default privateResolver;

// 최종 return 값으로 async 함수를 줌.
// 이 최종 return 함수인 async 함수를 그래프큐엘 서버가 받아서 실행할텐데,
// 이때 그래프큐엘 서버에서 parent, args, context, info를 인자로 하여 async함수를 실행.
// async함수에서는 이 인자들을 받아서 context에 user 확인하고.
// user가 확인된 경우에만,
// 다시한번 parent, args, context, info 가지고 원래 받은 함수를 실행시킴.

// // EX
// const sum = function(x) {
//   return function(y) {
//     return x + y;
//   }
// }
// console.log(sum(2)(5)); // 7
// 가장 안에 함수에 5를 떤져서 function(x){ return x + 5} 를 만들고
// 그다음에 2를 떤져서 return 7이됨.
// const sum = (x) => (y) => {return x + y}
// 의 형태
// sum(2)(5)
// sum(2) = (y) => {return 2 + y}
// sum(2)(5) => {return 2 + 5}

// 마찬가지로 그래프큐엘 서버가
// privateResolver(myFunc(parent, args, context, info) => {}) 에
// (parent, args, context, info)를 떤질거고.
// privateResolver(myFunc(parent, args, context, info))(parent, args, context, info)
// 형태가 될거고.
// 그래프큐엘 서버가 떤진, (parent, args, context, info)를 가장 안에있는 async함수가 받아서
// context 의 user 검사하고
// user 검사 통과한 경우에만, myFunc에 (parent, args, context, info) 담아서 실행.
