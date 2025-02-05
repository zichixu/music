from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configure the PostgreSQL database
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://zichixu:Eric1208@localhost/music_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database
db = SQLAlchemy(app)

# Define the Song model
class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    artist = db.Column(db.String(100), nullable=False)
    file_path = db.Column(db.String(200), nullable=False)

# Create the database tables
with app.app_context():
    db.create_all()

# Root route
@app.route('/')
def home():
    return "Welcome to the Music API"

# Route to get all songs
@app.route('/api/songs')
def get_songs():
    songs = Song.query.all()
    return jsonify([{'title': song.title, 'artist': song.artist} for song in songs])

@app.route('/api/add_test_song')
def add_test_song():
    test_song = Song(
        title='Test Song',
        artist='Test Artist',
        file_path='/path/to/test/song.mp3'
    )
    db.session.add(test_song)
    db.session.commit()
    return jsonify({'message': 'Test song added'})

if __name__ == '__main__':
    app.run(debug=True)