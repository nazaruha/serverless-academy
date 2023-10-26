class UserValidator {
    static NameValidate = (name) => {
        name = name.trim().split(' ');
        if (name.length > 0) {
            var _name = name[0][0].toUpperCase() + name[0].slice(1).toLowerCase();
            return _name;
        }
        return "";
    }
}

module.exports = UserValidator;