export default function formatDate(date){
  const d = new Date(date)

  var mm = d.getMonth() + 1;
  var dd = d.getDate();

  return [
    (dd>9 ? '' : '0') + dd,
    (mm>9 ? '' : '0') + mm,
    d.getFullYear(),
  ].join('/');
}
