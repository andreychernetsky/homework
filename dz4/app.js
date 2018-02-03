(function () {

    'use strict';

    const TAG_TEMPLATE = document.createElement('span');
    TAG_TEMPLATE.innerHTML = `
        <span class="tag-title"></span>
        <button type="button">&#128939;</button>
    `;
    TAG_TEMPLATE.classList.add('tag');

    const SELECTED_TAG_TEMPLATE = document.createElement('span');
    SELECTED_TAG_TEMPLATE.classList.add('tag');

    const OPTION_TEMPLATE = document.createElement('option');

    let tagEditorForm = document.forms.tagEditor,
        tagSelectorForm = document.forms.tagUser,
        tagListEl = document.getElementById('tagList'),
        selectedTagsEl = document.getElementById('selectedTags'),
        tagOptions = document.getElementById('tagOptions');

    let tagEditor = {
        tags: new Set(),
        add (tag) {
            let _tag = tag.toLowerCase(),
                refresh = !this.tags.has(_tag);
            this.tags.add(_tag);
            return refresh;
        },
        remove (tag) {
            this.tags.delete(tag.toLowerCase());
        },
        getSortedArray () {
            return [...this.tags.values()].sort();
        },
        getDocumentFragment () {
            return this.getSortedArray().reduce((fragment, tag) => {
                let template = TAG_TEMPLATE.cloneNode(true);
                template.dataset.tagId = tag;
                template.firstElementChild.textContent = capitalize(tag);
                fragment.appendChild(template);
                return fragment;
            }, document.createDocumentFragment());
        },
        onSubmit (event) {
            event.preventDefault();
            let tagInput = event.target.elements.tagName,
                tag = tagInput.value;
            if (this.add(tag)) {
                updateTagList();
            }
            tagInput.value = '';
            tagInput.focus();
        },
        handleEvent (e) {
            switch (e.type) {
            case 'sumbit':
                return this.onSubmit(e);
            }
        }
    };

    let tagSelector = {
        selectedTags: [],
        filterOptions () {
            return tagEditor.getSortedArray().filter(tag => {
                return !this.selectedTags.includes(tag);
            });
        },
        getOptions () {
            return this.filterOptions().reduce((fragment, tag) => {
                let option = OPTION_TEMPLATE.cloneNode(false);
                option.value = tag;
                option.textContent = capitalize(tag);
                fragment.appendChild(option);
                return fragment;
            }, document.createDocumentFragment());
        }
    };

    tagEditorForm.addEventListener('submit', tagEditor);

    tagListEl.addEventListener('click', function (event) {
        if (event.target.matches('.tag button')) {
            let tag = event.target.closest('.tag');
            tagEditor.remove(tag.dataset.tagId);
            tag.remove();
        }
    });

    tagSelectorForm.elements.tagInput.addEventListener('input', function () {
        if (tagSelector.filterOptions().includes(this.value)) {
            tagSelectorForm.dispatchEvent(new Event('submit'));
        } else {
            tagOptions.innerHTML = '';
            tagOptions.appendChild(tagSelector.getOptions());
        }
    });

    tagSelectorForm.addEventListener('submit', function (event) {
        event.preventDefault();
        let input = this.elements.tagInput,
            tag = input.value;

        if (tagEditor.tags.has(tag)) {
            let tagEl = SELECTED_TAG_TEMPLATE.cloneNode(true);
            tagEl.textContent = capitalize(tag);
            selectedTagsEl.appendChild(tagEl);
            tagSelector.selectedTags.push(tag);
        }
        input.value = '';
        input.focus();
    });


    function updateTagList() {
        tagListEl.innerHTML = '';
        tagListEl.appendChild(tagEditor.getDocumentFragment());
    }

    function capitalize(tag) {
        return tag
            .split(' ')
            .map(word => {
                return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
            })
            .join(' ');
    }


}());

