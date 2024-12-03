export const toBrDateTime = (datetime: string):string => {
  return datetime.replace(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(.*)/, '$3/$2/$1 $4:$5')
}
