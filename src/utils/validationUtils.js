export function validateEmail(email) {
    // eslint-disable-next-line
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let errors = [];
    email = email.trim();

    if (!email) {
        errors.push('This field is required');
    }

    if (!re.test(email)) {
        errors.push('Email must be properly formatted');
    }

    return errors;
}

export function validatePassword(password) {
    let errors = [];
    password = password.trim();

    if (!password) {
        errors.push('This field is required');
    }

    if (password.length < 6) {
        errors.push('Password must contains at least 6 characters');
    }

    return errors;
}

export function validateName(name) {
    let errors = [];
    name = name.trim();

    if (!name) {
        errors.push('This field is required');
    }

    if (name.length < 6) {
        errors.push('Name must contains at least 6 characters');
    }

    return errors;
}

export function validateCategoryAdd(categories, newCategoryTitle) {
    let errors = [];
    newCategoryTitle = newCategoryTitle.trim().toLowerCase();

    if (!newCategoryTitle) {
        errors.push('This field is required');
    }

    if (newCategoryTitle.length < 6) {
        errors.push('Title must contains at least 6 characters');
    }

    // eslint-disable-next-line
    categories.map(function (item) {
        let title = item.title.trim().toLowerCase();

        if (title === newCategoryTitle) {
            errors.push('This title is already in use');
        }
    });

    return errors;
}

export function validateCategoryUpdate(categories, newCategoryTitle, oldTitle) {
    let errors = [];
    newCategoryTitle = newCategoryTitle.trim().toLowerCase();

    if (!newCategoryTitle) {
        errors.push('This field is required');
    }

    if (newCategoryTitle.length < 6) {
        errors.push('Title must contains at least 6 characters');
    }

    // eslint-disable-next-line
    categories.map(function (item) {
        let title = item.title.trim().toLowerCase();

        if (newCategoryTitle !== oldTitle.toLowerCase()) {
            if (title === newCategoryTitle) {
                errors.push('This title is already in use');
            }
        }
    });

    return errors;
}