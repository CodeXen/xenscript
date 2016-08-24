function _(el) {
    // About object is returned if there is no 'id' parameter
    var about = {
        Version: 1.0,
        Author: "Ruju Bajracharya",
        Created: "Fall 2016",
        Updated: "24 August 2016"
    };

    if (el) {
        // Avoid clobbering the window scope:
        // return a new _ object if we're in the wrong scope
        if (window === this) {
            return new _(el);
        }

        this.e = document.querySelector(el);
        return this;
    } else {
        // No 'id' parameter was given, return the 'about' object
        return about;
    }
};

/* _ Prototype Functions ============================*/
_.prototype = {
    hide: function() {
        this.e.style.display = 'none';
        return this;
    },
    show: function() {
        this.e.style.display = 'inherit';
        return this;
    },
    bgcolor: function(color) {
        this.e.style.background = color;
        return this;
    },
    val: function(newval) {
        this.e.value = newval;
        return this;
    },
    value: function() {
        return this.e.value;
    },
    toggle: function() {
        if (this.e.style.display !== 'none') {
            this.e.style.display = 'none';
        } else {
            this.e.style.display = '';
        }
        return this;
    },
    size: function(height, width) {
        this.e.style.height = height + 'px';
        this.e.style.width = width + 'px';
        return this;
    },
    append: function(val) {
        var el = this.e;
        var content = document.createTextNode(val); 
        el.appendChild(content);
        return this;
    },
    html: function(val) {
        var el = this.e;
        el.innerHTML = val;
        return this;
    },
    addClass: function(className) {
        if (this.e.classList) {
            this.e.classList.add(className);
        } else {
            this.e.className += ' ' + className;
        }
        return this;
    },

    // =========== Event handling ============
    on: function(event, callback) {
        this.e.addEventListener(event, callback, false);
    },
    change: function(callback) {
        this.on('onchange', callback);
    },
    click: function(callback) {
        this.on('click', callback);
    },
    submit: function(callback) {
        this.on('submit', callback);
    },
    mouseOver: function(callback) {
        this.on('onMouseOver', callback);
    },

    // =========== Form Data ============
    serialize: function(evt){
        var evt = evt || window.event;
        evt.target = evt.target || evt.srcElement || null;
        var field, query='';
        if(typeof this.e == 'object' && this.e.nodeName == "FORM"){
            for(i=this.e.elements.length-1; i>=0; i--){
                field = this.e.elements[i];
                if(field.name && field.type != 'file' && field.type != 'reset'){
                    if(field.type == 'select-multiple'){
                        for(j=this.e.elements[i].options.length-1; j>=0; j--){
                            if(field.options[j].selected){
                                query += '&' + field.name + "=" + encodeURIComponent(field.options[j].value).replace(/%20/g,'+');
                            }
                        }
                    }
                    else{
                        if((field.type != 'submit' && field.type != 'button') || evt.target == field){
                            if((field.type != 'checkbox' && field.type != 'radio') || field.checked){
                                query += '&' + field.name + "=" + encodeURIComponent(field.value).replace(/%20/g,'+');
                            }   
                        }
                    }
                }
            }
        }
        return query.substr(1);
    },
    formData: function() {    
        var data = new FormData(this.e);
        return data;
    }
};

function _ajaxSubmit(arg) {
    var x = new XMLHttpRequest();
    x.open(arg.meth, arg.url, true);
    x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    x.send(arg.data);
    return x;
}

function _ajaxReturn(x) {
    if (x.readyState == 4 && x.status == 200) {
        return true;
    }
}