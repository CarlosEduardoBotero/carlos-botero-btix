const renameKey = <OldKey extends string, NewKey extends string, T>(
  oldKey: OldKey,
  newKey: NewKey,
  userObject: T
) => {
  const { [oldKey]: value, ...common } = userObject;

  return {
    ...common,
    ...{ [newKey]: value },
  };
};
export default renameKey;
