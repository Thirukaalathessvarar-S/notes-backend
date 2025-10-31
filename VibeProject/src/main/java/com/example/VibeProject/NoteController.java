package com.example.VibeProject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "*")
public class NoteController {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    private User getAuthenticatedUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @GetMapping
    public List<Note> getAllNotes() {
        User user = getAuthenticatedUser();
        return noteRepository.findByUser(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable(value = "id") Long noteId) {
        User user = getAuthenticatedUser();
        Optional<Note> note = noteRepository.findById(noteId);
        if (note.isPresent() && note.get().getUser().equals(user)) {
            return ResponseEntity.ok().body(note.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Note createNote(@RequestBody Note note) {
        User user = getAuthenticatedUser();
        note.setUser(user);
        return noteRepository.save(note);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable(value = "id") Long noteId,
                                           @RequestBody Note noteDetails) {
        User user = getAuthenticatedUser();
        Optional<Note> optionalNote = noteRepository.findById(noteId);
        if (optionalNote.isPresent() && optionalNote.get().getUser().equals(user)) {
            Note note = optionalNote.get();
            note.setTitle(noteDetails.getTitle());
            note.setContent(noteDetails.getContent());
            final Note updatedNote = noteRepository.save(note);
            return ResponseEntity.ok(updatedNote);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable(value = "id") Long noteId) {
        User user = getAuthenticatedUser();
        Optional<Note> optionalNote = noteRepository.findById(noteId);
        if (optionalNote.isPresent() && optionalNote.get().getUser().equals(user)) {
            noteRepository.deleteById(noteId);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
