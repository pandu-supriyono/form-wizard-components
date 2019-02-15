'use strict';

describe('hmpoTextarea', () => {
    let locals;

    beforeEach(() => {
        locals = {
            options: {
                fields: {
                    'my-input': {
                        validate: 'required'
                    }
                }
            },
            values: {
                'my-input': 'abc123'
            }
        };
    });

    it('renders with id', () => {
        const $ = render('hmpoTextarea', { id: 'my-input' }, locals);

        const $component = $('.govuk-textarea');
        expect($component.attr('id')).to.equal('my-input');
    });

    it('renders with label and hint', () => {
        const $ = render('hmpoTextarea', { id: 'my-input' }, locals);

        const $label = $('.govuk-label');
        expect($label.text().trim()).to.equal('fields.my-input.label');
        const $hint = $('.govuk-hint');
        expect($hint.text().trim()).to.equal('fields.my-input.hint');
    });

    it('renders with value', () => {
        const $ = render('hmpoTextarea', { id: 'my-input' }, locals);

        const $component = $('.govuk-textarea');
        expect($component.text()).to.equal('abc123');
    });

    it('renders with aria-required', () => {
        const $ = render('hmpoTextarea', { id: 'my-input' }, locals);

        const $component = $('.govuk-textarea');
        expect($component.attr('aria-required')).to.equal('true');
    });

    it('renders with max-length from validator', () => {
        locals.options.fields['my-input'].validate = [ { type: 'maxlength', arguments: 5 } ];

        const $ = render('hmpoTextarea', { id: 'my-input' }, locals);

        const $component = $('.govuk-textarea');
        expect($component.attr('maxlength')).to.equal('5');
    });

    it('renders with errorValue if available', () => {
        locals.errorValues = {
            'my-input': 'def456'
        };

        const $ = render('hmpoTextarea', { id: 'my-input' }, locals);

        const $component = $('.govuk-textarea');
        expect($component.text()).to.equal('def456');
    });

    it('renders error message if available', () => {
        locals.errors = {
            'my-input': { key: 'my-input', type: 'validator' }
        };

        const $ = render('hmpoTextarea', { id: 'my-input' }, locals);

        const $component = $('#my-input-error');
        expect($component.text().trim()).to.equal('fields.my-input.validation.validator');
    });

});
