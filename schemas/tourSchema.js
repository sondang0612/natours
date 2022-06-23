const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const { Schema } = mongoose;

const tourSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'A tour must have a name'],
            unique: true,
            trim: true,
            maxLength: [
                40,
                'A tour name must have less or equal then 40 characters',
            ],
            minLength: [
                5,
                'A tour name must have less or equal then 40 characters',
            ],
            // validate: [
            //     validator.isAlpha,
            //     'Tour name must only contain characters',
            // ],
        },
        duration: {
            type: Number,
            required: [true, 'A tour must have a duration'],
        },
        slug: String,
        difficulty: {
            type: String,
            required: [true, 'A tour must have a group size'],
            enum: {
                values: ['easy', 'medium', 'difficulty'],
                message: 'Difficulty is either: easy, medium, difficulty',
            },
        },
        maxGroupSize: {
            type: Number,
            required: [true, 'A tour must have a group size'],
        },
        ratingsAverages: {
            type: Number,
            default: 4.5,
            min: [1, 'Rating must be above 1.0'],
            max: [5, 'Rating must be below 5.0'],
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            required: [true, 'A tour must have a price'],
        },
        priceDiscount: {
            type: Number,
            validate: {
                validator: function (val) {
                    return val < this.price;
                    // 250 < 200 => false => trigger validator
                    // 150 < 200 => true => nothing
                },
                message: 'Discount price should be below regular price',
            },
        },
        summary: {
            type: String,
            trim: true,
            required: [true, 'A tour must have a summary'],
        },
        description: {
            type: String,
            trim: true,
        },
        imageCover: {
            type: String,
            require: [true, 'A tour must have a cover image'],
        },
        images: [String],
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        startDates: [Date],
        secretTour: {
            type: Boolean,
            default: false,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// not part of the database
// the conversion each time after query data
// VIRTUAL PROPERTIES
tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs before the .save() and .create()
tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

// QUERY MIDDLEWARE
// point to the current query
// /^find/: any thing start with find ex: find, findById, findOne,...
// before query
tourSchema.pre(/^find/, function (next) {
    this.find({ secretTour: { $ne: true } });
    next();
});

// after query get docs
tourSchema.post(/^find/, function (docs, next) {
    next();
});

module.exports = mongoose.model('Tour', tourSchema);
