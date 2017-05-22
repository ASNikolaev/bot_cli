const settingPath = (path, currentlyPath, defaultPath) => {
  if (/~/.test(path))
    return defaultPath;

  if (/^\/$/.test(path))
    return path;

  if (/\.{2}/.test(path)) {
    currentlyPath = currentlyPath.split('/');
    currentlyPath.length = currentlyPath.length - 1;
    currentlyPath = currentlyPath.join('/');
    return currentlyPath;
  }

  if (/^\.\//.test(path)) {
    path = path.substr(2, path.length)
    currentlyPath = `${currentlyPath}/${path}`;
    return currentlyPath;
  }

  return `${currentlyPath}/${path}`

}

const settingDir = (currentlyPath) => {
  let currentlyDir;
  currentlyPath = currentlyPath.split('/');
  currentlyDir = currentlyPath[currentlyPath.length - 1];
  return currentlyDir
}

export {settingDir, settingPath}
