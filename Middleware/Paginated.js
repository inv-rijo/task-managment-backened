const { Op } = require("sequelize");

const pager = async (
  model,
  pageNo,
  count,
  searchCol,
  searchKey,
  sortCol,
  sortMeth
) => {
  const page = parseInt(pageNo);
  const limit = parseInt(count);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  let keyWord = searchKey || null;
  let sortMethod = sortMeth || "ASC";
  let listData;
  if (keyWord === null) {
    listData = await model.findAndCountAll({
      offset: startIndex,
      limit: limit,
      order: [[sortCol, sortMethod]],
    });
  } else {
    console.log(searchCol);
    listData = await model.findAndCountAll({
      offset: startIndex,
      limit: limit,
      order: [[sortCol, sortMethod]],
      where: {
        [searchCol]: {
          [Op.like]: "%" + keyWord + "%",
        },
      },
    });
  }
  if (endIndex < listData.count) {
    listData.hasNextPage = true;
  } else {
    listData.hasNextPage = false;
  }
  return listData;
};

module.exports = { pager };
