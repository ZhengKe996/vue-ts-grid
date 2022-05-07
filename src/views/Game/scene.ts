const creatediv = (className: string) => {
  const div = document.createElement("div");

  div.className = className;
  return div;
};

// 创建一个类名的数组，其中一个为cell black, 其余为cell
const creatcell = () => {
  let temp = ["cell", "cell", "cell", "cell"];
  const i = Math.floor(Math.random() * 4); // 随机产生黑块的位置 Math.random()函数参数 0~1的随机数
  temp[i] = "cell black";
  return temp;
};

export { creatediv, creatcell };
