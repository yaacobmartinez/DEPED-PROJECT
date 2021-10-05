export const returnAccessLevelString = (access_level) => {
    let access_level_string = ""
    switch (access_level) {
        case 2048:
            access_level_string = 'Administrator'
            break;
        case 4096:
            access_level_string = 'Super Administrator'
            break;
        case 2:
            access_level_string = 'Faculty'
            break;
        default:
            access_level_string = `Student`
            break;
    }
    return access_level_string
}

export const getFullName = (params) => {
    return `${params.getValue(params.id, 'firstName') || ''} ${
      params.getValue(params.id, 'lastName') || ''
    }`;
}
