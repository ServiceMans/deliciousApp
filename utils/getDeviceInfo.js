const menuButton = uni.getMenuButtonBoundingClientRect()
export const getMarginTop = () => {
  return menuButton.top
}

export const getNavBarHeight = () =>{
	return menuButton.height
}